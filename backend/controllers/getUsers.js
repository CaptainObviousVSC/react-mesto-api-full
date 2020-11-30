const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const LoginError = require('../errors/LoginError');
require('dotenv').config();

const getUsers = (req, res, next) => {
  User.find({}).orFail(() => {
    throw new NotFoundError('Невозможно получить пользователя');
    err.statusCode = 404;
  }).then((data) => res.send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
       next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
       next(new NotFoundError('Невозможно получить пользователей'));
      }
     next();
    });
};
const getUserId = (req, res, next) => {
  User.findById(req.params._id).orFail(() => {
    throw new NotFoundError('Невозможно получить пользователя');
    err.statusCode = 404;
  }).then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Невозможно получить пользователя'));
      }
     next();
    });
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true, new: true }).orFail(() => {
    throw new NotFoundError('Невозможно обновит аватар');
    err.statusCode = 404;
  }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        next(new BadRequestError(`Ошибка валидации: ${messages.join(' ')}`));
      } else {
        next();
      }
    });
};
const getUserInfo = (req, res, next) => {
  const {_id} = req.user
  User.findById(_id).orFail(() => {
   throw new NotFoundError('Невозможно получить информацию о пользователе');
    err.statusCode = 404;
  }).then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
         next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Невозможно получить информацию о пользователе'))
      }
      next();
    });
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true }).orFail(() => {
   throw new NotFoundError('Невозможно обновить пользователя');
    err.statusCode = 404;
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        next(new BadRequestError(`Ошибка валидации: ${messages.join(' ')}`));
      } else if (err.reason === null) {
        next(new BadRequestError('Неподходящий тип данных'));
      } else {
        next();
      }
    });
};
const createUser = (req, res, next) => {
  const { name, about, avatar} = req.body;
  //  if(!email || !password) {
  //   throw new BadRequestError('Пользователь с таким email уже зарегестрирован');
  // }
  bcrypt.hash(req.body.password, 10)
 .then((hash) => User.create({ name, about, avatar, email: req.body.email, password: hash })).then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        next(new BadRequestError(`Ошибка валидации: ${messages.join(' ')}`));
      } else {
       next();
      }
    });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((matched) => {
          const token = jwt.sign({
            _id: user._id
          }, 'some-secret-key', { expiresIn: '7d' });
          if (!matched) {
            next(new LoginError('Неправильные почта или пароль'));
          }
          res.send({ token });
        })
      }
      return Promise.reject(new LoginError('Неправильные почта или пароль'));
    })
    .catch(next);
};
module.exports = {
  getUsers, getUserId, createUser, updateUserAvatar, updateUser, login, getUserInfo
};
