const express = require('express');
const router = express.Router()
const Employee = require('../model/employee');
const Validation = require('../validation');
const {validate} = require('../validationMw');

router.post('/', validate(Validation.employee), async(req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        address: req.body.address,
        dob:req.body.dob,
        contact_no: req.body.contact_no,
        email:req.body.email
    })
    const emp = await employee.save();
    res.status(200).json(emp);
})

router.get('/', async (req, res)=>{  
    const employees = await Employee.find();
    res.status(200).send(employees);
})

router.get('/:id', async (req, res)=>{  
    const employee = await Employee.findById(req.params.id);
    res.status(200).send(employee);
})

router.put("/:id", async(req, res)=>{
    const employee = await Employee.findByIdAndUpdate({_id: req.params.id});
    res.status(200).send(employee);
});

router.delete("/:id", async(req, res)=>{
    await Employee.deleteOne({_id: req.params.id});
    res.status(200).send('Employee deleted');
});

module.exports = router