const mongoose = require('mongoose');

const metaModel = new mongoose.Schema({
    node_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Node'},
    reading_name: {type: String},
    reading_value: {type: String},
    unit: {type: String},
    created_at: {type: Date, default: Date.now}
});


module.exports =  mongoose.model('Meta', metaModel);