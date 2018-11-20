const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const verifyNodeToken = require('../../middle/nodeFunctions').verifyNodeToken;

const Meta = require('../../models/meta');

const Boom = require('boom');

module.exports = {
    method: 'POST',
    path: '/api/meta',
    pre: [verifyAPIToken, verifyNodeToken],
    handler: async(req, res) => {
        try {
            await verifyAPIToken(req, res);
            await verifyNodeToken(req, res);
            console.log(res.locals);

            let meta = new Meta();

            meta.reading_name = req.body.reading_name;
            meta.reading_value = req.body.reading_value;
            meta.unit = req.body.unit;

            res.locals.node.addMeta(meta);

            return res.send(meta);

        } catch(err) {
            return res.send(Boom.badRequest(err));
        }
    }
}