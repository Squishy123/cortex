const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const Node = require('../../models/node');
const Cluster = require('../../models/cluster');

const Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/api/nodes',
    pre: [verifyAPIToken],
    handler: async(req, res) => {
        try {
            await verifyAPIToken(req, res);
            let node = new Node();
            node.name = req.body.name;
            node.description = req.body.description;
            //setup cluster-node relation
            node.cluster_id = res.locals.cluster._id;
            node.api_token = res.locals.cluster.api_token;
            await node.save();
            res.locals.cluster.nodes.push({node_id: node._id});
            await res.locals.cluster.save();

            return res.send(node);
        } catch(err) {
            return res.send(Boom.badRequest(err))
        }
    }
}