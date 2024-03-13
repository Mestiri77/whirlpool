const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Article = sequelize.define('Article', {
    idArticle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    coloeur: DataTypes.STRING,
    typeC: DataTypes.STRING,
    capacite: DataTypes.FLOAT,
    prix: DataTypes.INTEGER
  });

  module.exports= Article;