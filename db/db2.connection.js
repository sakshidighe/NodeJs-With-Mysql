// db.connection.js

const  Sequelize  = require('sequelize');


const sequelize = new Sequelize('configuration', 'root', '15032004', {
  host: 'localhost',
  dialect: 'mysql',
});



const mysql = require('mysql2/promise'); // Use promise-based version

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '15032004',
  database: 'configuration',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



module.exports = sequelize;
