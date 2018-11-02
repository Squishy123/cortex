const Boom = require('boom');

const User = require('../model/user');

const createUserSchema = require('../schemas/createUser');

const verifyUniqueUser = require('../util/userFunctions').verifyUniqueUser;

//Create a new user route
//req: username: required, email: required, password: required
module.exports = {
    method: 'POST',
    path: '/api/users',
    config: {
        auth: false,
        //verify user is unique before passing to handler
        pre: [{ method: verifyUniqueUser }],
        handler: async (req, h) => {
            try {
                let user = new User();
                user.email = req.payload.email;
                user.username = req.payload.username;

                await user.addHashedPassword(req.payload.password);
                
                await user.save();
                return user;
            } catch (err) {
                return Boom.badRequest(err);
            }
        },
        //validate the payload against the Joi schema
        validate: {
            payload: createUserSchema
        }
    }
}