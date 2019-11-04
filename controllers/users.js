const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const handleResponse = (req, res) => {
  req
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const getUsers = (req, res) => {
  handleResponse(User.find({}), res);
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.find({ _id: userId })
  .then((users) => {
    if(users.length <= 0) {
      res.status(404).send({ message: 'Пользователь не найден' });
    } else {
      res.send({ data: users });
    }
  }).catch(() => res.status(404).send({ message: 'Пользователь не найден' }));;
};

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      // ошибка аутентификации
      res
        .status(401)
        .send({ message: err.message });
    });
};

const createUser = (req, res) => {
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
    .catch(() => res.status(400).send({ message: 'Произошла ошибка' }));
};

const updateUser = (req, res) => {
  const owner = req.user._id;
  const { name, about } = req.body;
  handleResponse(User.findByIdAndUpdate(owner, { name, about }), res);
};

const updateAvatar = (req, res) => {
  const opts = { runValidators: true };
  const owner = req.user._id;
  const { avatar } = req.body;
  handleResponse(User.findOneAndUpdate(owner, { avatar }, opts), res);
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar, login,
};
