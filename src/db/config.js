const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Configuração inicial do Database do sqlite
module.exports = () => open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });

