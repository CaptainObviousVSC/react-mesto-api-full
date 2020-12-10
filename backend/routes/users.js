const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const {
  getUsers, getUserId, updateUserAvatar, updateUser, getUserInfo,
} = require('../controllers/getUsers');
const { validatorLink } = require('../utils/validators');

router.get('/users', getUsers);
router.get('/users/me', getUserInfo);
router.get('/users/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
}), getUserId);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(validatorLink),
  }),
}), updateUserAvatar);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);
router.use(errors());
module.exports = router;
