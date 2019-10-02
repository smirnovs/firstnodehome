const router = require('express').Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join('./data', 'users.json');
const cardsPath = path.join('./data', 'cards.json');

fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const users = JSON.parse(data);
  const userList = (req, res) => {
    res.send(users);
  };
  const sendUser = (req, res, next) => {
    const { id } = req.params;
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        res.send(users[i]);
        return;
      }
    }
    next();
  };
  const noUser = (req, res) => {
    res.send({ message: 'Нет пользователя с таким id' });
  };
  router.get('/users/', userList);
  router.get('/users/:id', sendUser);
  router.get('/users/:id', noUser);
});

fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const cards = JSON.parse(data);
  const usersRoute = 'users';
  const cardsRoute = 'cards';
  const cardList = (req, res) => {

    if (req.params.cards !== usersRoute && req.params.cards !== cardsRoute) {
      res.send({ message: 'Запрашиваемый ресурс не найден' });
    } else {
      res.send(cards);
    }
  };
  router.get('/:cards/', cardList);
});

module.exports = router;
