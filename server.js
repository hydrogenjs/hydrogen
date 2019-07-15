const fs = require('fs-extra');
const { defaultLayout } = require('./layouts');
const { index } = require('./pages');
const data = require('./data.json');

const listOfFruits = `
  <ul>
    ${data.fruits.map(fruit => `<li>${fruit}</li>`).join('')}
  </ul>
`;

const Homepage = defaultLayout({
  content: index({ list: listOfFruits }),
});

fs.writeFile('./dist/index.html', Homepage);

