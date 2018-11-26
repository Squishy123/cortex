const Boom = require('boom');

const User = require('../../models/user');

const createUserSchema = require('../../util/schemas/createUser');

const verifyUniqueUser = require('../../middle/userFunctions').verifyUniqueUser;

//Create a new user route
//req: username: required, email: required, password: required
module.exports = {
    method: 'POST',
    path: '/api/users',
    auth: false,
    //verify user is unique before passing to handler
    pre: [verifyUniqueUser],
    handler: async (req, res) => {
        try {
            await verifyUniqueUser(req, res);
            let user = new User();
            user.email = req.body.email;
            user.username = req.body.username;

            await user.addHashedPassword(req.body.password);

            await user.save();
            return res.send(user);
        } catch (err) {
            return res.send(Boom.badRequest(err));
        }
    },
    //validate the payload against the Joi schema
    validate: {
        payload: createUserSchema
    }
}

