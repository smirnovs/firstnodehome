const express = require('express');
const path = require('path');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/', routes);
// app.use('*', (req, res) => {
//   res.status(404);
//   res.send({ message: 'Запрашиваемый ресурс не найден' });
// });

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);