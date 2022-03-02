const Joi = require('joi');

exports.employee = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().max(200).min(20).required(),
    dob: Joi.string().required(),
    email: Joi.string().min(5).max(255).email().required(),
    contact_no: Joi.string().min(10).max(15).required()
})