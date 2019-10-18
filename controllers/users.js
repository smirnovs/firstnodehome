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
  handleResponse(User.find({ _id: userId }), res);
};


const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  handleResponse(User.create({ name, about, avatar }), res);
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
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
