const Boom = require('boom');

const Group = require('../model/group');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;


module.exports = {
    method: 'POST',
    path: '/api/groups',
    config: {
        pre: [{ method: verifyAccessToken, assign: 'user' }],
        handler: async (req, h) => {
            try {
                let group = new Group();
                group.name = req.payload.name;
                group.description = req.payload.description;
                group.secret_id = Math.random().toString(36).slice(2);
                group.users.push({ user_id: req.pre.user._id, scopes: ["owner", "edit", "view"] });

                req.pre.user.groups.push({ group_id: group._id, scopes: ["owner", "edit", "view"] });
                await req.pre.user.save();
                
                await group.save();

                return group;
            } catch (err) {
                return Boom.badRequest(err);
            }
        }
    }
}