const Boom = require('boom');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/group',
    config: {
        pre: [verifyAccessToken, verifyGroupAccess],
        handler: async (req, res) => {
            await verifyAccessToken(req, res);
            await verifyGroupAccess(req, res);
            try {
                return res.send(res.locals.group);
            } catch (err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}