const Boom = require('boom');

const Group = require('../../models/group');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/groups',
    config: {
        pre: [verifyAccessToken],
        handler: async(req, res) => {
            await verifyAccessToken(req, res);
            try  {
                let groups = await Group.find({"users.user_id": res.locals.user._id});
        
                return res.send(groups);
            } catch(err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}