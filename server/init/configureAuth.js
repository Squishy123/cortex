//const userFunctions = require('../api/users/util/userFunctions');

async function validate(user) {
    /*
    try {
        let userQuery = await userFunctions.validateUserCreds(user);
        return (userQuery) ? true : false;
    } catch (err) {
        return(err);
    }
    */
   return user;
}

const configureAuth = {
    name: 'configureAuth',
    version: '0.0.1',
    //register auth jwt2
    register: async function(server, options) {
        try {
            await server.register(require('hapi-auth-jwt2'));
             //jwt security scheme
             server.auth.strategy('jwt', 'jwt',
             {
                 key: process.env.KEY,
                 validate,
                 verifyOptions: { algorithms: ['HS256'] }
             });

         return;
        } catch (err) {
            return err;
        }
    }
}

module.exports = configureAuth;