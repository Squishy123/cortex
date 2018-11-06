const Boom = require('boom');

const Group = require('../model/group');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;


//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/groups',
    config: {
        pre: [{ method: verifyAccessToken , assign: 'user'}],
        handler: async(req, h) => {
            try  {
                return req.pre.user.groups;
            } catch(err) {
                return Boom.badRequest(err);
            }
        }
    }
}