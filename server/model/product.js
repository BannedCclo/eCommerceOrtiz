const { DataTypes } = require('sequelize');
const sequelize = require('../bd/bd');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageurl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
  
});

module.exports = Product;