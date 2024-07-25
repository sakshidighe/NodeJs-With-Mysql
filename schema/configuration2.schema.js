// jobs.schema.js

const DataTypes  = require('sequelize');
const sequelize = require('../db/db2.connection'); // Example: Sequelize instance

const Job = sequelize.define('configuration', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  tableName: 'configuration', // Ensure table name matches
  timestamps: false // Optionally, if you don't want Sequelize to manage timestamps
});
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables synchronized with alterations!');
  })
  .catch(err => {
    console.error('Error synchronizing database & tables with alterations:', err);
  });

module.exports = Job
