const express = require('express');
const router = express.Router()
const Employee = require('./model');

router.post('/addEmployee', async(req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        address: req.body.address,
        dob:req.body.dob,
        contact_no: req.body.contact_no,
        emai:req.body.emai
    })
    const emp = await employee.save();
    res.json(emp);
})

router.get('/getEmployees', async (req, res)=>{  
    const employees = await Employee.find();
    res.send(employees);
})

router.get('/getOne/:id', async (req, res)=>{  
    const employee = await Employee.findById(req.params.id);
    res.send(employee);
})

router.put("/update/:id", async(req, res)=>{
    const employee = await Employee.findByIdAndUpdate({_id: req.params.id});
    res.send(employee);
});

router.delete("/remove/:id", async(req, res)=>{
    await Employee.deleteOne({_id: req.params.id});
    res.send('Employee deleted');
});

module.exports = router