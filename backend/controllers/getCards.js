const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getCards = (req, res, next) => {
  Card.find({}).then((data) => res.send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Невозможно получить карточки'));
      }
      next(err);
    });
};
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      const err = new Error('Карточка не найдена');
      err.statusCode = 403;
    })
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId).then((cards) => res.status(200).send(cards));
      } else {
        throw new BadRequestError('Нельзя удалять чужую карточку');
      }
    })
    .catch((err) => {
      if (err.statusCode === 403) {
        next(new Error('Карточка не найдена'))
      }
      next(err);
    });
};
const addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { runValidators: true, new: true }).populate(['likes', 'owner']).orFail(() => {
    const err = new NotFoundError('Невозможно поставить лайк');
    err.statusCode = 404;
    throw err;
  }).then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Невозможно поставить лайк'));
      }
      next();
    });
};
const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { runValidators: true, new: true }).populate(['likes', 'owner']).orFail(() => {
    const err = new NotFoundError('Невозможно удалить лайк');
    err.statusCode = 404;
    throw err;
  }).then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Невалидный ID'));
      }
      if (err.statusCode === 404) {
        next(new NotFoundError('Невозможно убрать лайк'));
      }
      next();
    });
};
const postCards = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id }).then((card) => res.send(card))
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
module.exports = {
  getCards, postCards, deleteCard, addLike, deleteLike,
};
