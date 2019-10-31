const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

const {
  login, createUser,
} = require('./controllers/users');

const {
  router, usersRoute, cardsRoute, errorPage,
} = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('/', router);
app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/users', usersRoute);
app.use('/cards', cardsRoute);
app.use('*', errorPage);

app.listen(PORT);
