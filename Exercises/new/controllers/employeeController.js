const Joi = require('joi');
const { resolve } = require('path/posix');
const db = require("../models"); 

//create main module
const Employee = db.employees

const policy = (req,res,next)=>{
  const schema = Joi.object({
  name: Joi.string().min(5).required(),
  address: Joi.string().min(10).required(),
  dob: Joi.date().required(),
  contact_no: Joi.string().length(10).required(),
  email: Joi.string().min(5).required().email()
  });

const { name, address, dob, contact_no, email } = req.body;
const { error } = schema.validate({ name, address, dob, contact_no, email });

if (error) {
      res.status(400).json({ message: error.details[0].message });
    
}else{
return next();}
};
  
  // Create a Employee
  const addEmployee = async (req,res) => {
    
    //create
    let info = {
    name: req.body.name,
    address: req.body.address,
    dob:req.body.dob,
    contact_no:req.body.contact_no,
    email:req.body.email
    };

    //save employee to the database
    const employee = await Employee.create(info)
    .then(employee => {
      res.status(200).send(employee);
      console.log(employee);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while creating the Employee."
      });
      console.log('not success');
    })

  };
  
// Retrieve all Employees
const getAllEmployees = async (req,res) =>{

  let employees = await Employee.findAll({})
  res.status(200).send(employees)

}

//search a single Employee with an id
const getOneEmployee = async (req,res) =>{

  let id = req.params.id
  let employee = await Employee.findOne({where: { id: id }})//link id 
  res.status(200).send(employee)
  
}

// Update a Employee details by the id in the request
const updateEmployee = async (req,res) =>{

  let id = req.params.id
  
  const employee = await Employee.update(req.body, {where: {id: id}})
  res.status(200).send(employee)
  
}

// remove a Employee with the given id 
const deleteEmployee = async (req,res) =>{

  let id = req.params.id
  
  await Employee.destroy( {where: {id: id}})
  res.status(200).send("Employee is deleted..")
  
}

module.exports.uniqueEmail = function(email){
  return new Promise(function (resolve,reject){
    Employee.findOne({email: email}, function(email_err, email_result){
      if (isSecureContext(email_err) && !empty(email_err)){
        reject(Error.database_error());
      }else{
        if (isSecureContext(email_result) && !empty(email_result)){
          reject(Error.invalid_error(messagesString.email_exists));
      }else{
        resolve(email);
      }
    }
    });

  })
}

module.exports = {
  addEmployee,
  getAllEmployees,
  getOneEmployee,
  updateEmployee,
  deleteEmployee,
  policy
}