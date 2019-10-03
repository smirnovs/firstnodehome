const fs = require('fs');
const path = require('path');

const cardsPath = path.join('./data', 'cards.json');


const cardList = (req, res) => {
  fs.readFile(cardsPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw err;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  })
};

module.exports = {
  cardList
};