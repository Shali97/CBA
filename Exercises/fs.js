var http = require('http');
const express = require('express');
var fs = require('fs');

const app = express();

app.use(express.json());

const data1 = "Shalika";

app.get('/students' , (req,res)=>{
    
    fs.writeFile("test.txt", data1, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
        }
    }); 
    //res.send(data1);
    fs.readFile('test.txt',function(err,data){
        console.log("Written file:");
        console.log(data.toString());
    }); 
});

app.listen(8000, ()=>{
    console.log("server running");
});