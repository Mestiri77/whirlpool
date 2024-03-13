const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Sellout = sequelize.define('Sellout', {
    idSellout: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateCr: DataTypes.STRING,
    nbrV: DataTypes.INTEGER,
    objectif: DataTypes.STRING
  });
  module.exports = Sellout;