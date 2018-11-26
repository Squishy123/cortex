const Boom = require('boom');

const Node = require('../models/node');

const mongoose = require('mongoose');

/**
 * Checks if a node is verified
 * If yes return the node, if not send error
 * @param {Request} req 
 * @param {Result} res 
 * @param {Callback} next 
 */
async function verifyNodeToken(req, res, next) {
    try {
        let verified = await Node.findOne({
            api_token: (req.body.api_token) ? req.body.api_token : req.headers.api_token,
            _id: mongoose.Types.ObjectId((req.body.node_id) ? req.body.node_id: req.headers.node_id)
        });

        if(!verified)
            return res.send(Boom.badRequest('No Node Found!'))
        
        res.locals.node = verified;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}

module.exports = {
    verifyNodeToken: verifyNodeToken
}