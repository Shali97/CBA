const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const students = [{ id: 1, name: "Shalika", age : "24", city : "Badulla"  },
            { id: 2, name: "Tishan", age : "26", city : "Gampaha" },
            { id: 3, name: "Rashi", age : "24", city : "Galle" }
]

app.get('/api/students' , (req,res)=>{
    res.send(students); 
});

const policy = (req,res,next)=>{
    const schema = Joi.object({
    name: Joi.string().min(5).required(),
    age: Joi.number().integer().min(1).max(120).required()
  });

  const { name, age } = req.body;
  const { error } = schema.validate({ name, age });

  if (error) {
    switch (error.details[0].context.key) {
      case "name":
        res.status(500).json({ message: error.details[0].message });
        break;
      case "age":
        res.status(500).json({ message: error.details[0].message });
        break;
      default:
        res.status(500).json({ message: "An error occurred." });
        break;
    }
  }
  return next();
};

app.post("/api/students", policy, (req, res) => {
    return res.json({ id: students.length +1, ...req.body});
});
  
// Server setup
app.listen(8000, ()=>{
    console.log("server running");
});
