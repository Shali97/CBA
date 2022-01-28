const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

// Sample JSON data set1
const students = [{ id: 1, name: "Shalika", age : "24", city : "Badulla"  },
            { id: 2, name: "Tishan", age : "26", city : "Gampaha" },
            { id: 3, name: "Rashi", age : "24", city : "Galle" },
            { id: 4, name: "Vimukthi", age : "27", city : "Gampaha" },
            { id: 5, name: "Sulakshi", age : "25", city : "Rathmalana" }
]

app.get('/api/students' , (req,res)=>{
   // This will send the JSON student data to the client.
    res.send(students); 
});

app.post('/api/students',(req,res)=>{
  const schema = {
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().required()
  }

  const result = Joi.validate(req.body , schema);
  console.log(result);

  if(!req.body.name || req.body.name.length < 5 ){
    res.status(400).send("Name is required and should be minimum 5 characters");
    return;
  }
  if(!req.body.age || req.body.age < 0 ){
    res.status(400).send("Age is required or Invalid");
    return;
  }
  const student = {
    id:students.length +1,
    name: req.body.name,
    age: req.body.age
  };
  students.push(student);
  res.send(student);
});

app.get('/api/students/:id' , (req,res)=>{
     const student = students.find(c => c.id === parseInt(req.params.id)); 
     if(!student) res.status(404).json('The student with the given ID was not found'); //404 error
     res.json(student);
});
  
// Server setup
app.listen(8000, ()=>{
    console.log("server running");
});