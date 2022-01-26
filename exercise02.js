const express = require('express');
const app = express();
  
// Sample JSON data set1
const student = [{ id: 1, name: "Shalika", age : "24", city : "Badulla"  },
            { id: 2, name: "Tishan", age : "26", city : "Gampaha" },
            { id: 3, name: "Rashi", age : "24", city : "Galle" },
            { id: 4, name: "Vimukthi", age : "27", city : "Gampaha" },
            { id: 5, name: "Sulakshi", age : "25", city : "Rathmalana" }]

// Sample JSON data set2
const courses = [{ id: 1, name: "Shalika", course : "IT", university : "KDU"  },
             { id: 2, name: "Tishan", course : "Management", university : "Hopkins" },
             { id: 3, name: "Rashi", course : "SE", university : "KDU" },
             { id: 4, name: "Vimukthi", course : "HRM", university : "NIBM" },
             { id: 5, name: "Sulakshi", course : "CS", university : "NSBM" }]
  
app.get('/' , (req,res)=>{
   // This will send the JSON student data to the client.
    res.json(student); 
});

app.get('/api/courses' , (req,res)=>{
    //send course data to the client
     res.json(courses); 
 });

 app.get('/api/courses/:id' , (req,res)=>{
     const course = courses.find(c => c.id === parseInt(req.params.id)); 
     if(!course) res.status(404).json('The course with the given ID was not found'); //404 error
     res.json(course);
});
  
// Server setup
app.listen(8000, ()=>{
    console.log("server running");
});