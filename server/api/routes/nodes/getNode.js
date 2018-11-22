const Node = require('../../models/node');

const mongoose = require('mongoose');

const Boom = require('boom');

module.exports = {
    method: 'GET',
    path: '/api/node',
    config: {
        handler: async(req, res) => {
            try {

                let nodes = await Node.find({api_token: req.headers.api_token, _id: mongoose.Types.ObjectId(req.headers.node_id)});
                return res.send(nodes);
            } catch(err) {
                return res.send(Boom.badRequest(err));
            }
        }
    }
}