const Joi = require('joi');

//validate createUser information
const createUserSchema = Joi.object({
    //contain alphanumeric chars,  2 <= length <= 30
    username: Joi.string().alphanum().min(2).max(30).required(),
    //email must be valid, and have 2 domain parts (example.com)
    email: Joi.string().email({ minDomainAtoms: 2 }),
    //alphanumeric chars, 2 <= length <= 30 
    password: Joi.string().alphanum().min(2).max(30).required()
});

module.exports = createUserSchema;