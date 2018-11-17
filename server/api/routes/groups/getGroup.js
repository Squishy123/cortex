const Boom = require('boom');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/group',
    config: {
        pre: [verifyAccessToken, verifyGroupAccess],
        handler: async (req, h) => {
            try {
                return req.pre.group;
            } catch (err) {
                return Boom.badRequest(err);
            }
        }
    }
}