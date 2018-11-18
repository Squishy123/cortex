const Boom = require('boom');

const Cluster = require('../../models/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

module.exports = {
    method: 'GET',
    path: '/api/cluster',
    config: {
        pre: [verifyAccessToken, verifyGroupAccess],
        handler: async (req, res) => {
            await verifyAccessToken(req, res);
            await verifyGroupAccess(req, res);
            try {
                let cluster = await Cluster.findOne({ _id: req.headers.cluster_id });
                if(!cluster)
                    return res.send(Boom.badRequest("Invalid cluster_id"));
                
                return res.send(cluster);
            } catch (err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}