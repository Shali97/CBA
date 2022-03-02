const mongoose = require('mongoose');
const { db } = require('./model/employee');

mongoose.connect('mongodb://localhost/employee')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

  Employee = require("./model/employee")
  db.Employee = Employee;

  module.exports.db = db;