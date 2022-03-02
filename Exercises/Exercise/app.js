const express = require('express');
const employeeRouter = require('./routes/emp');
const {db} = require('./db')

const app = express();
let server = null;

app.use(express.json());


app.use('api/employee' , employeeRouter)

const service_port = 5000;

server = app.listen(service_port, (err)=> {
  if (err) console.log("failed to start the port at " + service_port);
        else {
          console.log("service started at " + service_port);
        }
})

const getServer = () => {
  return server;
};

const getDB = () => {
  return db;
};

module.exports.getServer = getServer;
module.exports.getDB = getDB;
