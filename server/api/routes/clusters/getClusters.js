const Boom = require('boom');

const Cluster = require('../model/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;
const verifyGroupAccess = require('../../groups/util/groupFunctions').verifyGroupAccess;


//list a user's groups
module.exports = {
    method: 'GET',
    path: '/api/clusters',
    config: {
        pre: [{ method: verifyAccessToken , assign: 'user'}, { method: verifyGroupAccess, assign: 'group' }],
        handler: async(req, h) => {
            try  {
                let clusters = await Cluster.find({"group_id": mongoose.Types.ObjectId(req.headers.group_id)});
                if(!clusters)
                    return Boom.badRequest("Group has no clusters");
                return clusters;
            } catch(err) {
                return Boom.badRequest(err);
            }
        }
    }
}