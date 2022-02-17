const Joi = require('joi');
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    address:{
        type: String,
    },
    dob: {
      type: Date, 
      required: true,
      default: Date.now
    },
    contact_no: {
        type: Number,
        required: true,
        min: 10
    },
    email: {
        type: String
    }
})

function validateEmployee(employee){
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      address: Joi.string().max(200).min(20).required(),
      email: Joi.string().min(5).max(255).required().email(),
      contact_no: Joi.string().min(10).max(15).required()
    }
    return Joi.validate(employee, schema);
}

module.exports =  mongoose.model('Employee', employeeSchema)
exports.validate = validateEmployee();