const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const SomeError = require('../errors/some-error');

const handleResponse = (req, res, next) => {
  req
    .then((users) => {
      if (!users) {
        throw new SomeError('Произошла ошибка');
      } else {
        res.send({ data: users });
      }
    })
    .catch(next);
};

const getUsers = (req, res) => {
  handleResponse(User.find({}), res);
};

const getUser = (req, res, next) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then((users) => {
      if (users.length <= 0) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.send({ data: users });
      }
    }).catch(next);
};

const login = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((users) => res.status(201).send(users))
    .catch(next);
};

const updateUser = (req, res, next) => {
  // if (!req.body.name || !req.body.about) {
  //   next(new SomeError('Вы неправильно указали имя или описание пользователя'));
  // } else {}
  const owner = req.user._id;
  const { name, about } = req.body;
  handleResponse(User.findByIdAndUpdate(owner, { name, about }), res);
};

const updateAvatar = (req, res, next) => {
  // if (!req.body.avatar) {
  //   next(new SomeError('Вы не указали ссылку на новый аватар'));
  // } else {}
  const opts = { runValidators: true };
  const owner = req.user._id;

  const { avatar } = req.body;
  handleResponse(User.findOneAndUpdate(owner, { avatar }, opts), res);
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
};
