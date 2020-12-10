const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const { validatorLink } = require('../utils/validators');
const {
  getCards, postCards, deleteCard, addLike, deleteLike,
} = require('../controllers/getCards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(validatorLink).required(),
  }),
}), postCards);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), addLike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteLike);
router.use(errors());
module.exports = router;
