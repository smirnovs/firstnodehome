const cardsRoute = require('express').Router();
const {
  getCards, getCard, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRoute.get('/', getCards);
cardsRoute.get('/:cardId', getCard);
cardsRoute.post('/', createCard);
cardsRoute.delete('/:cardId', deleteCard);
cardsRoute.put('/:cardId/likes', likeCard);
cardsRoute.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRoute;
