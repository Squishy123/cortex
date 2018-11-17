const Boom = require('boom');

//default createUser schema
const authenticateUserSchema = require('../../util/schemas/authenticateUser');

//unique user verification
const verifyCredentials = require('../../middle//userFunctions').verifyCredentials;

//authenticate a user
//reqs: username: required, email: required, password: required
module.exports = {
    method: 'POST',
    path: '/api/users/authenticate',
    config: {
        //verify user credentials
        pre: [verifyCredentials],
        handler: async (req, res, next) => {
            try {
                let token = await req.pre.user.createAccessToken();
                return { access_token: token };
            } catch (err) {
                Boom.badRequest(err);
            }
        },

        validate: {
            payload: authenticateUserSchema
        }
    }
}