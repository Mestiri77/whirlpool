const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const PriceM = sequelize.define('PriceM', {
    idPriceM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateC: DataTypes.DATE
  });

  module.exports=PriceM;