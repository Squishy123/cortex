const Boom = require('boom');

const Cluster = require('../../models/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

module.exports = {
    method: 'POST',
    path: '/api/clusters',
    pre: [verifyAccessToken, verifyGroupAccess],
    handler: async (req, res) => {
        await verifyAccessToken(req, res);
        await verifyGroupAccess(req, res);
        try {
            let cluster = new Cluster();
            cluster.name = req.body.name;
            cluster.description = req.body.description;
            cluster.group_id = mongoose.Types.ObjectId(req.body.group_id);
            await cluster.createAPIToken();
            await cluster.save();
            res.locals.group.clusters.push({ cluster_id: cluster._id });
            await res.locals.group.save();

            return res.send(cluster);
        } catch (err) {
            return res.send(Boom.badRequest(err));
        }
    }
}