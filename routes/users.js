const usersRoute = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateUser, updateAvatar,
} = require('../controllers/users');


usersRoute.get('/', getUsers);
usersRoute.get('/:userId', getUser);
usersRoute.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(10).max(30),
  }),
}), updateUser);
usersRoute.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/).min(6),
  }),
}), updateAvatar);

module.exports = usersRoute;
