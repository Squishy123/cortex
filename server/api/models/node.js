const mongoose = require('mongoose');

//schema for node
const nodeModel = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    cluster_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Cluster'},
    current_meta: {type: mongoose.Schema.Types.ObjectId, ref: 'Meta'},
    api_token: {type: String}
});

nodeModel.methods.addMeta = async function(meta) {
    this.current_meta=mongoose.Types.ObjectId(meta._id);

    await this.save();
    meta.node_id = this._id;
    await meta.save();

    return this;
}



module.exports =  mongoose.model('Node', nodeModel);