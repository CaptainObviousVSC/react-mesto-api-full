const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/getUsers');
const authFunction = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/Loggers');

const app = express();
app.use(cors());
app.use(requestLogger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mestodb-2', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', login);
app.post('/signup', createUser);
app.use('/', authFunction, usersRoutes);
app.use('/', authFunction, cardsRoutes);
app.use(errorLogger);
app.use(errors());
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
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
