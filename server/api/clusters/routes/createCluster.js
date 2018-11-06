const Boom = require('boom');

const Cluster = require('../model/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../users/util/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../groups/util/groupFunctions').verifyGroupAccess;

module.exports = {
    method: 'POST',
    path: '/api/clusters',
    config: {
        pre: [{ method: verifyAccessToken, assign: 'user' }, { method: verifyGroupAccess, assign: 'group' }],
        handler: async (req, h) => {
            try {
                let cluster = new Cluster();
                cluster.name = req.payload.name;
                cluster.description = req.payload.description;
                cluster.group_id = mongoose.Types.ObjectId(req.payload.group_id);

                await cluster.save();
                req.pre.group.clusters.push({ cluster_id: cluster._id });
                await req.pre.group.save();

                return cluster;
            } catch (err) {
                return Boom.badRequest(err);
            }
        }
    }
}