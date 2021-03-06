
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const clusterModel = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    api_token: {type: String},
    group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Group'},
    nodes: [{node_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Node'}}]
});

/**
 * Generates an API token for this cluster for node access
 */
clusterModel.methods.createAPIToken = async function() {
    try {
        this.api_token = [...Array(36)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
        await this.save();
        
        return {cluster: cluster, api_token: this.api_token, message: "Success"};
    } catch(err) {
        return err;
    }
}

/**
 * Adds a node to the cluster
 * @param {Node} node 
 */
clusterModel.methods.addNode = async function(node) {
    this.nodes.push({node_id: node._id});
    await this.save();
    node.cluster_id = this._id;
    await node.save();
}

module.exports = mongoose.model('Cluster', clusterModel);