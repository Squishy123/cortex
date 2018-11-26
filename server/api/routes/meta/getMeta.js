const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const verifyNodeToken = require('../../middle/nodeFunctions').verifyNodeToken;

const Meta = require('../../models/meta');

const Boom = require('boom');

const mongoose = require('mongoose');

module.exports = {
    method: 'GET',
    path: '/api/meta',
    pre: [verifyAPIToken, verifyNodeToken],
    handler: async(req, res) => {
        try {
            await verifyAPIToken(req, res);
            await verifyNodeToken(req, res);
            
            let verified = await Meta.findOne({_id: mongoose.Types.ObjectId(req.headers.meta_id), node_id: mongoose.Types.ObjectId(res.locals.node._id)})
            if(!verified) 
                return res.send(Boom.badRequest("Invalid Meta!!!"));

            return res.send(verified);
        } catch(err) {
            return res.send(Boom.badRequest(err));
        }
    }
}