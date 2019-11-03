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
  handleResponse(Card.find({_id: cardId}), res);
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  handleResponse(Card.create({ name, link, owner }), res);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const currentUser = req.user._id;
  Card.findOne({ _id: cardId })
    .then((card) => {
      const cardOwner = card.owner.toString();
      //сравниваем ID текущего юзера и создателя карточки
      if (cardOwner !== currentUser) {
        //если не совпадает, отправляем сообщение
        res.status(403).send({ message: 'Отказано в доступе' });
        //и тут нужно прервать промис
        return Promise.reject(new Error(''));
        // reject(new Error('Не вы создавали не вам и удалять'));
      }
      //если совпадает, идет then и ищется нужная карточка
    }).then(() => {
      Card.findByIdAndRemove(cardId)
        .then((card) => {
          //показываем карточку
          res.send({ data: card });
          //catch при ошибке поиска карточки
        }).catch((err) => { throw err; });
      //catch при ошибке в верификации
    }).catch(() => { res.status(404).send({ message: 'Карточка не найдена' }); });
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
