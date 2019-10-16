const router = require('express').Router();
// const { userList, getUser, createUser } = require('./users');
const { getUsers, createUser } = require('../controllers/users');
// const { cardList } = require('./cards');


const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

router.get('/users', getUsers);
// router.get('/users/:id', getUser);
router.post('/users', createUser);
// router.get('/cards/', cardList);
router.get('*', errorPage);

module.exports = router;
