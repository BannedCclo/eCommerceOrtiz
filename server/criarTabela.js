const sequelize = require('./bd/bd');
const User = require('./model/user');
const Product = require('./model/product');

sequelize.sync({ force: true }).then(() => {
  console.log('Banco de dados sincronizado.');
}).catch((error) => {
  console.error('Erro ao sincronizar banco de dados:', error);
});