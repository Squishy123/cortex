const verifyAPIToken = require('../../middle/clusterFunctions').verifyAPIToken;

const verifyNodeToken = require('../../middle/nodeFunctions').verifyNodeToken;

const mongoose = require('mongoose');

const Meta = require('../../models/meta');

const Cluster = require('../../models/cluster');

const Boom = require('boom');

//current format = {reading_name: reading_value}
module.exports = {
    method: 'POST',
    path: '/api/metas',
    pre: [verifyAPIToken, verifyNodeToken],
    handler: async (req, res) => {
        try {
            await verifyAPIToken(req, res);
            await verifyNodeToken(req, res);

            let data = req.body.metas, keys = Object.keys(data);
            let metas = [];
            for (let i = 0; i < keys.length; i++) {
                //check and remove dups
                let dup = await Meta.findOneAndDelete({ $and: [{ reading_name: keys[i] }, { reading_value: data[keys[i]] }, { created_at: data['time'] }] });
                /*if (dup) {
                    console.log(`Duplicate Found: ${dup._id}`);
                    let cluster = await Cluster.find({_id: dup.cluster_id});
                    let index = cluster.historical_meta.findIndex((e) => {
                        return mongoose.Types.ObjectId(e.meta_id).equals(ongoose.Types.ObjectId(dup._id));
                    });
                    cluster.historical_meta = historical_meta.splice(0, index).concat(historical_meta.splice(index+1, historical_meta.length));
                    //console.log(cluster.historical_meta)
                    cluster.historical_meta = cluster.historical_meta
                    await cluster.save();
                    //await Cluster.update({_id: dup.cluster_id, api_token: req.body.api_token}, {$pull: {historical_meta: {$elemMatch: {meta_id: mongoose.Types.ObjectId(dup._id)}}}});
            } */
                let meta = new Meta();
                meta.reading_name = keys[i];
                meta.reading_value = data[keys[i]];
                meta.created_at = data['time'];
                await res.locals.node.addMeta(meta);
            }
            return res.send(metas);

        } catch (err) {
            return res.send(Boom.badRequest(err));
        }
    }
}

