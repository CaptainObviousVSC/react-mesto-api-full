const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { validatorLink } = require('./utils/validators');
const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/getUsers');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Loggers'); 

const app = express();
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mestodb-1', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(validatorLink),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use('/', auth, usersRoutes);
app.use('/', auth, cardsRoutes);
app.use('/', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
app.use(errorLogger);
app.use(errors())
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
  next()
}); 
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
}); 