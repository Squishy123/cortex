const Boom = require('boom');

const Cluster = require('../../models/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/clusters',
    config: {
        pre: [verifyAccessToken, verifyGroupAccess],
        handler: async(req, res) => {
            try  {
                await verifyAccessToken(req, res);
                await verifyGroupAccess(req, res);
                let clusters = await Cluster.find({"group_id": mongoose.Types.ObjectId(req.headers.group_id)});
                if(!clusters)
                    return res.send(Boom.badRequest("Group has no clusters"));
                return res.send(clusters);
            } catch(err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}