var http = require('http');
const express = require('express');
var fs = require('fs');

const app = express();

app.use(express.json());

const data1 = "Nilakshi";

app.get('/' , (req,res)=>{
    
    fs.writeFile("test.txt", data1, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    }); 
    readFile()
});

async function readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile('test.txt', 'utf8', function (err, data) {
        if (err) {
          reject(err);
          console.log(err);
        }
        resolve(data);
        console.log(data);
      });
    });
  }

app.listen(8000, ()=>{
    console.log("server running");
});
