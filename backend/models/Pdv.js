const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const PDV = sequelize.define('PDV', {
    idPDV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    pdvname: DataTypes.STRING,
    location: DataTypes.STRING
  });
  module.exports = PDV;