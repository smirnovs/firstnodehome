const fs = require('fs');
const path = require('path');

const usersPath = path.join('./data', 'users.json');

const usersFile = new Promise((resolve) => {
  fs.readFile(usersPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw err;
    }
    const users = JSON.parse(data);
    resolve(users);
  });
});

const userList = (req, res) => {
  usersFile.then((data) => {
    res.send(data);
  }).catch((error) => { throw error; });
};

const sendUser = (req, res) => {
  const { id } = req.params;
  usersFile.then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i]._id === id) {
        res.send(data[i]);
        return;
      }
    } if (data._id !== id) {
      res.status(404);
      res.send({ message: 'Нет пользователя с таким id' });
    }
  }).catch((error) => { throw error; });
};

module.exports = {
  userList,
  sendUser,
};
