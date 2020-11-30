const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { validatorLink } = require('./utils/validators');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors')
require('dotenv').config();

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/getUsers');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Loggers'); 
const app = express();
app.use(cors());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mestodb-1', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.post('/signin', login);
app.post('/signup', createUser);
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