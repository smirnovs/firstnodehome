const router = require('express').Router();
const { userList, sendUser } = require('./users');
const { cardList } = require('./cards');


const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

router.get('/users/', userList);
router.get('/users/:id', sendUser);
router.get('/cards/', cardList);
router.get('*', errorPage)

module.exports = router;
