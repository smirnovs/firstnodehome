const router = require('express').Router();
const cardsRoute = require('./cards');
const usersRoute = require('./users');

const mainPage = (req, res) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  console.log(NODE_ENV);
  res.send({ message: NODE_ENV });
};

const errorPage = (req, res) => {
  res.status(404);
  res.send({ message: 'Запрашиваемый ресурс не найден' });
};

router.get('/', mainPage);

module.exports = {
  router, cardsRoute, usersRoute, errorPage,
};
