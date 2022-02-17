const mongoose = require('mongoose');
const express = require('express');
const employeeRouter = require('./routes');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/employee')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use('/employees' , employeeRouter)

app.listen(9000, ()=> {
    console.log('Server running');
})