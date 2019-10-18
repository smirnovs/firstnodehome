const usersRoute = require('express').Router();
const {
  getUsers, getUser, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUser);
usersRoute.post('/', createUser);
usersRoute.patch('/me', updateUser);
usersRoute.patch('/me/avatar', updateAvatar);

module.exports = usersRoute;
