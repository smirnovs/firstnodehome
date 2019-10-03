const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const express = require('express');

const usersPath = path.join('./data', 'users.json');
const cardsPath = path.join('./data', 'cards.json');

const usersFile = new Promise((resolve, reject) => {
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw err;
    }
    const users = JSON.parse(data);
    resolve(users);
  })
});

const userList = (req, res) => {
  usersFile.then((data) => {
    res.send(data);
  }).catch(error => { throw error })
};

const sendUser = (req, res, next) => {
  const { id } = req.params;
  usersFile.then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        res.send(data[i]);
        return;
      }
    }
  }).catch(error => { throw error })
  // next();
};

// const noUser = (req, res) => {
//   res.status(404);
//   res.send({ message: 'Нет пользователя с таким id' });
// };

const cardList = (req, res) => {
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw err;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  })
};

const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

router.get('/', express.static(path.join(__dirname, 'public')));
router.get('/users/', userList);
router.get('/users/:id', sendUser);
// router.get('/users/:id', noUser);
router.get('/cards/', cardList);
router.get('*', errorPage)



// fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
//   if (err) {
//     throw err;
//   }

//   const users = JSON.parse(data);
//   const userList = (req, res) => {
//     res.send(users);
//   };
// const sendUser = (req, res, next) => {
//   const { id } = req.params;
//   for (let i = 0; i < users.length; i++) {
//     if (users[i]._id === id) {
//       res.send(users[i]);
//       return;
//     }
//   }
//   next();
// };
//   const noUser = (req, res) => {
//     res.status(404);
//     res.send({ message: 'Нет пользователя с таким id' });
//   };
//   router.get('/users/', userList);
//   router.get('/users/:id', sendUser);
//   router.get('/users/:id', noUser);
// });

// fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
//   if (err) {
//     throw err;
//   }

//   const cards = JSON.parse(data);
//   const usersRoute = 'users';
//   const cardsRoute = 'cards';
//   const cardList = (req, res) => {
//     if (req.params.cards !== usersRoute && req.params.cards !== cardsRoute) {
//       res.status(404);
//       res.send({ message: 'Запрашиваемый ресурс не найден' });
//     } else {}
//     res.send(cards);

//   };
//   router.get('/cards/', cardList);
// });

module.exports = router;
