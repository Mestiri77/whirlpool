const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Users = sequelize.define('Users', {
    idusers: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });

  module.exports=Users