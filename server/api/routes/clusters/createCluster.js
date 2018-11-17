const Boom = require('boom');

const Cluster = require('../../models/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

module.exports = {
    method: 'POST',
    path: '/api/clusters',
    pre: [verifyAccessToken, verifyGroupAccess],
    handler: async (req, h) => {
        try {
            let cluster = new Cluster();
            cluster.name = req.payload.name;
            cluster.description = req.payload.description;
            cluster.group_id = mongoose.Types.ObjectId(req.payload.group_id);
            await cluster.createAPIToken();
            await cluster.save();
            req.pre.group.clusters.push({ cluster_id: cluster._id });
            await req.pre.group.save();

            return cluster;
        } catch (err) {
            return Boom.badRequest(err);
        }
    }
}