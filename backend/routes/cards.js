const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { validatorLink } = require('../utils/validators');
const {
  getCards, postCards, deleteCard, addLike, deleteLike,
} = require('../controllers/getCards');

router.get('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(validatorLink),
    cardId: Joi.string().required().max(24),
  }),
}), getCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().max(24),
  }),
}), deleteCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(validatorLink),
  }),
}), postCards);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().max(24),
  }),
}), addLike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().max(24),
  }),
}), deleteLike);
router.use(errors());
module.exports = router;
