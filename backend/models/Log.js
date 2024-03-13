const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Log = sequelize.define('Log', {
    idLog: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    messageAc: DataTypes.STRING,
    dateAc: DataTypes.STRING,
    TimeAc: DataTypes.STRING
  });

  module.exports= Log;