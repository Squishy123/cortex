const Boom = require('boom');

const Cluster = require('../../models/cluster');

const mongoose = require('mongoose');

const verifyAccessToken = require('../../middle/userFunctions').verifyAccessToken;

const verifyGroupAccess = require('../../middle/groupFunctions').verifyGroupAccess;

module.exports = {
    method: 'GET',
    path: '/api/cluster',
    config: {
        pre: [{ method: verifyAccessToken, assign: 'user' }, { method: verifyGroupAccess, assign: 'group' }],
        handler: async (req, h) => {
            try {
                let cluster = await Cluster.findOne({ _id: req.headers.cluster_id });
                if(!cluster)
                    return Boom.badRequest("Invalid cluster_id");
                
                return cluster;
            } catch (err) {
                return Boom.badRequest(err);
            }
        }
    }
}