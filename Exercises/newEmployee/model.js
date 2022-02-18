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
      required: true
    },
    contact_no: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    }
})

module.exports =  mongoose.model('Employee', employeeSchema)
