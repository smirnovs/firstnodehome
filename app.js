const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '5da83f4a42868f2cdccab408',
  };

  next();
});

app.use(express.static(path.join(__dirname, 'public')));
// app.use('/users', routes);
app.use('/', routes);

app.listen(PORT);
