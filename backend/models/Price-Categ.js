const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const PriceM_Category = sequelize.define('PriceM_Category', {
    idPriceM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    idCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true // Remove autoIncrement: true from this field
    }
});

module.exports = PriceM_Category;
