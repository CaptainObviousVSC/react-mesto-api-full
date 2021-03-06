const mongoose = require('mongoose');
const { validatorLink, validatorEmail } = require('../utils/validators');

const link = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: validatorLink,
    default: link,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validatorEmail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
module.exports = mongoose.model('user', userSchema);
