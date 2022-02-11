const express = require('express');
const cors = require('cors');

const app = express()

var corsOptions = {
    origin: "http://localhost:8081"
  };

  app.use(cors(corsOptions));

  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  //routes
  const router = require("./routes/routes.js")
  app.use("/api/employees", router)
  
  // testing api
  app.get("/", (req, res) => {
    res.json({ message: "Hello from API" });
  });
  
  // set port
  const PORT = process.env.PORT || 8000;

  //server
  app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}.`);
  });