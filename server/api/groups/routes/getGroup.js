const Boom = require('boom');

const Group = require('../model/group');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../util/groupFunctions').verifyGroupAccess;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/group',
    config: {
        pre: [{ method: verifyAccessToken , assign: 'user'}, {method: verifyGroupAccess, assign: 'group'}],
        handler: async(req, h) => {
            try  {
                return req.pre.group;
            } catch(err) {
                return Boom.badRequest(err);
            }
        }
    }
}