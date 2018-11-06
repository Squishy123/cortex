const Boom = require('boom');

const Group = require('../model/group');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;


//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/groups',
    config: {
        pre: [{ method: verifyAccessToken , assign: 'user'}],
        handler: async(req, h) => {
            try  {
                let groups = await Group.find({"users.user_id": req.pre.user._id});
                if(!groups)
                    return Boom.badRequest("User is not part of any group")
                return groups;
            } catch(err) {
                return Boom.badRequest(err);
            }
        }
    }
}