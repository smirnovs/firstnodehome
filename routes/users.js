const usersRoute = require('express').Router();
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUser);
usersRoute.patch('/me', updateUser);
usersRoute.patch('/me/avatar', updateAvatar);

module.exports = usersRoute;
