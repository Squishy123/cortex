const mongoose = require('mongoose');

//schema for node
const nodeModel = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    cluster_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Cluster'},
    current_meta: {type: mongoose.Schema.Types.ObjectId, ref: 'Meta'},
    historical_meta: [{meta_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Meta'}}]
})