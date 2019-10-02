const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const { PORT = 3000, BASE_PATH } = process.env;

const app = express();

app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Server start');
});
