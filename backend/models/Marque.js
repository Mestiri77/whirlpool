const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Marque = sequelize.define('Marque', {
    idMarque: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    marquename: DataTypes.STRING
  });

  module.exports= Marque;