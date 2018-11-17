const Boom = require('boom');

const Group = require('../../models/group');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/groups',
    config: {
        pre: [verifyAccessToken],
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