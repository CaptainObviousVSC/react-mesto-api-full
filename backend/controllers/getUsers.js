const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const LoginError = require('../errors/LoginError');
const RegistrError = require('../errors/RegistrError');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const getUsers = (req, res, next) => {
  User.find({}).orFail(() => {
    throw new NotFoundError('Невозможно получить пользователя');
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
  }).then((user) => {
    console.log(user);
    res.status(200).send(user);
  })
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
  User.findById(req.user).orFail(() => {
    throw new NotFoundError('Невозможно получить пользователя');
  }).then((user) => {
    console.log(user);
    res.status(200).send(user);
  })
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
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true }).orFail(() => {
    throw new NotFoundError('Невозможно обновить пользователя');
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email }).select('+password').then((user) => {
    console.log({ email });
    if (user) {
      console.log(user);
      throw new RegistrError('пользователь с таким email уже зарегестрирован');
    }
    return bcrypt.hash(password, 10);
  })
    .then((hash) => User.create({
      name, about, avatar, email: req.body.email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        next(new BadRequestError(`Ошибка валидации: ${messages.join(' ')}`));
      } else if (err.statusCode === 409) {
        next(new RegistrError('пользователь с таким email уже зарегестрирован'));
      } else {
        next(new BadRequestError('не заполнено одно или оба поля или заполнены не правильно'));
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
            _id: user._id,
          }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
          if (!matched) {
            next(new LoginError('Неправильные почта или пароль'));
          }
          res.send({ token });
        });
      }
      throw new LoginError('Неправильные почта или пароль');
    })
    .catch(next);
};
module.exports = {
  getUsers, getUserId, createUser, updateUserAvatar, updateUser, login, getUserInfo,
};
