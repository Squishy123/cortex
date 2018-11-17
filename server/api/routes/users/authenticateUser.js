const Boom = require('boom');

//default createUser schema
const authenticateUserSchema = require('../../util/schemas/authenticateUser');

//unique user verification
const verifyCredentials = require('../../middle/userFunctions').verifyCredentials;

//authenticate a user
//reqs: username: required, email: required, password: required
module.exports = {
    method: 'POST',
    path: '/api/users/authenticate',
    config: {
        //verify user credentials
        pre: [verifyCredentials],
        handler: async (req, res) => {
            try {
                await verifyCredentials(req, res);
                let token = await res.locals.user.createAccessToken();
                return res.send({ access_token: token });
            } catch (err) {
                return res.send(Boom.badRequest(err));
            }
        },

        validate: {
            payload: authenticateUserSchema
        }
    }
}