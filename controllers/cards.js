const Card = require('../models/card');

const handleResponse = (req, res) => {
  req
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getCards = (req, res) => {
  handleResponse(Card.find({}), res);
};

const getCard = (req, res) => {
  const { cardId } = req.params;
  handleResponse(Card.find({ _id: cardId }), res);
};


const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  handleResponse(Card.create({ name, link, owner }), res);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  handleResponse(Card.findByIdAndRemove(cardId), res);
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
