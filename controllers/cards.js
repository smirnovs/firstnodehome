const Card = require('../models/card');

let isDelete;

const handleResponse = (req, res) => {
  req
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// const verifyUser = (req, res, currentUser) => {
//   req.then((card) => {
//     const cardOwner = card.owner.toString();
//     if (currentUser !== cardOwner) {
//       isOwner = false;
//       // console.log(isOwner);
//       return isOwner;
//       // res.send({ message: 'Только создатель карточки может ее удалить' });
//     }
//     isOwner = true;
//     console.log(isOwner);
//     return isOwner;
//   });
// };

// const veriffy = new Promise((resolve, reject) => {
//   const { cardId } = req.params;
//   const currentUser = req.user._id;
//   Card.findOne({ _id: cardId }).then((card) => {
//     const cardOwner = card.owner.toString();
//     console.log(`запустил верификацию, изделит: ${isDelete}`);
//     if (cardOwner !== currentUser) {
//       console.log(`cardOwner !== currentUser, изделит: ${isDelete}`);
//       reject(new Error('Не вы создавали не вам и удалять'));
//     }
//     // isDelete = true;
//     resolve('ecgtiyj');
//   });
// });

const verifyUser = (req, res, currentUser) => {
  return new Promise((resolve, reject) => {
    req.then((card) => {
      const cardOwner = card.owner.toString();
      if (cardOwner !== currentUser) {
        reject(new Error('Не вы создавали не вам и удалять'));
        // return;
      }
      resolve('ecgtiyj');
    }).catch((err) => console.log(err));
  });
};

const getCards = (req, res) => {
  handleResponse(Card.find({}), res);
};

const getCard = (req, res) => {
  const { cardId } = req.params;
  const currentUser = req.user._id;
  verifyUser(Card.findOne({ _id: cardId }), res, currentUser)
    .then(
      handleResponse(Card.find({ _id: cardId }), res)
    ).catch(() => { res.send({ message: 'Не вы добавляли не вами и удалять' }); });
  // console.log(`запустил геткард: ${isDelete}`);
  // verifyUser(cardId, res, currentUser);
  // console.log(`после верификации, изделит: ${isDelete}`);

  // console.log(`изделит не пропущен: ${isDelete}`);
  // res.send({ message: 'Не вы добавляли не вами и удалять' });
};


const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  handleResponse(Card.create({ name, link, owner }), res);
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const currentUser = req.user._id;
  verifyUser(Card.find(cardId), res, currentUser);
  Card.findByIdAndRemove(cardId).then((card) => {
    const cardObject = card.owner.toString();
    if (cardObject !== currentUser) {
      Promise.reject(new Error('Не вы создавали не вам и удалять'));
      res.send({ message: 'Не вы создавали не вам и удалять' });
    } else {
      res.send({ data: card });
    }
  }).catch((err) => res.send({ message: 'error' }));
  // verifyUser(Card.find({ _id: cardId }), res, currentUser);
  // if (isOwner) {
  //   handleResponse(Card.findByIdAndRemove(cardId), res);
  // } else {
  //   res.send({ message: 'Только создатель карточки может ее удалить' });
  // }
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
