const Boom = require('boom');

const Group = require('../../models/group');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;


///create a new group for a user
module.exports = {
    method: 'POST',
    path: '/api/groups',
    config: {
        pre: [verifyAccessToken],
        handler: async (req, res) => {
            try {
                await verifyAccessToken(req, res);
                let group = new Group();
                group.name = req.body.name;
                group.description = req.body.description;
                group.secret_id = Math.random().toString(36).slice(2);
                group.users.push({ user_id: res.locals.user._id, scopes: ["owner", "edit", "view"] });
                res.locals.user.groups.push({ group_id: group._id, scopes: ["owner", "edit", "view"] });
                await res.locals.user.save();

                await group.save();

                return res.send(group);
            } catch (err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}

