const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const AccessDenied = require('../errors/access-denied');
const SomeError = require('../errors/some-error');

const handleResponse = (req, res, next) => {
  req
    .then((card) => {
      if (!card) {
        throw new SomeError('Произошла ошибка');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const getCards = (req, res) => {
  handleResponse(Card.find({}), res);
};


const getCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.find({ _id: cardId })
    .then((card) => {
      if (card.length <= 0) {
        throw new NotFoundError('Нет карточки с таким id');
      } else {
        res.send({ data: card });
      }
    }).catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  handleResponse(Card.create({ name, link, owner }), res);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const currentUser = req.user._id;
  Card.findById(cardId).then((card) => {
    if (!card) {
      throw new NotFoundError('Нет карточки с таким id');
    }
    const cardOwner = card.owner.toString();
    if (cardOwner !== currentUser) {
      //  если не совпадает, отправляем сообщение
      next(new AccessDenied('Отказано в доступе'));
    } else {
      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => {
          if (!deletedCard) {
            throw new SomeError('Не удалось удалить');
          }
          //  показываем карточку
          res.send({ data: deletedCard });
          //  catch при ошибке поиска карточки
        })
        .catch(next);
    }
  }).catch(next);
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  handleResponse(Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: owner } },
    { new: true },
  ), res);
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  handleResponse(Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: owner } },
    { new: true },
  ), res);
};

module.exports = {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
};
