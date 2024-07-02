const { DataTypes } = require('sequelize');
const sequelize = require('../config/config.js');

const Reference_has_Sellout = sequelize.define('Reference_has_Sellout', {
  Reference_idReference: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  Sellout_idSellout: {
    type: DataTypes.INTEGER,
    primaryKey: true
  } ,
  objectif :{
   type :  DataTypes.INTEGER
  } 
}, {
  tableName: 'reference_has_sellout', // explicitly define the table name
  timestamps: true // include timestamps if necessary
});

  module.exports = Reference_has_Sellout ;