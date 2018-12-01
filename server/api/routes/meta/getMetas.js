const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const verifyNodeToken = require('../../middle/nodeFunctions').verifyNodeToken;

const Meta = require('../../models/meta');

const Boom = require('boom');

const mongoose = require('mongoose');

module.exports = {
    method: 'GET',
    path: '/api/metas',
    pre: [verifyAPIToken, verifyNodeToken],
    handler: async (req, res) => {
        try {
            //await verifyAPIToken(req, res);
            //await verifyNodeToken(req, res);
            //console.log(req.headers.node_id);
            let verified;
            if (req.headers.skip_length)
                verified = await Meta.find({ node_id: mongoose.Types.ObjectId(req.headers.node_id), reading_name: req.headers.reading_name }).skip(Number(req.headers.skip_length)).limit(100).sort({ created_at: -1 });
            else
                verified = await Meta.find({ node_id: mongoose.Types.ObjectId(req.headers.node_id), reading_name: req.headers.reading_name }).limit(100).sort({ created_at: -1 });
            //console.log(verified);
            if (!verified)
                return res.send(Boom.badRequest("Invalid Meta!!!"));

            return res.send(verified);
        } catch (err) {
            return res.send(Boom.badRequest(err));
        }
    }
}