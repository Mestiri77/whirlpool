const Sequelize = require("sequelize");

const sequelize = new Sequelize("whirlpool", "root", "10519970", {
    dialect: "mysql",
    host: "localhost",
  });
  
  module.exports = sequelize;