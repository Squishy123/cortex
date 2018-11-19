const Boom = require('boom');

const mongoose = require('mongoose');

const Cluster = require('../models/cluster');

/**
 * Checks if a group share token is valid 
 * If yes, return the group if not send error
* @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyShareToken(req, res, next) {
    try {
        let verified = await Group.verifyShareToken(req.body.share_token, process.env.SECRET);
        if (!verified.group)
            return res.send(Boom.badRequest(verified.message));

        res.locals.user = verified.group;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}
/**
 * Checks if a cluster api key is valid 
 * If yes, return the group if not send error
* @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyAPIToken(req, res, next) {
    try {
        let verified = await Cluster.findOne({ api_token: (req.body.api_token) ? req.body.api_token : req.headers.api_token });
        if (!verified)
            return res.send(Boom.badRequest('Invalid API Key'));

        res.locals.cluster = verified;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}

module.exports = {
    verifyShareToken: verifyShareToken,
    verifyAPIToken: verifyAPIToken
}