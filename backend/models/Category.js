const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Category = sequelize.define('Category', {
    idCategory: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Categoryname: DataTypes.STRING
  });

  module.exports= Category;