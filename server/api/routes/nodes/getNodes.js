const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const Node = require('../../models/node');

const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/nodes',
    pre:[verifyAPIToken],
    config: {
        handler: async(req, res) => {
            try {
                await verifyAPIToken(req, res);
                let nodes = await Node.find({api_token: req.headers.api_token});
                return res.send(nodes);
            } catch(err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}