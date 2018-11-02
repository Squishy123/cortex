const mongoose = require('mongoose');

const groupModel = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    secret_id: { type: String, index: { unique: true } },
    users: [{ user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, scopes: [String] }],
    clusters: [{ cluster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster' } }]
});

groupModel.method.createShareToken = async function(scopes) {
    return await jwt.sign({group_id: this._id, secret_id: this.secret_id, scopes: scopes});
}

groupModel.method.addUser = async function(user, shareToken) {
    
}

groupModel.statics.verifyShareToken = async function(shareToken) {

}

module.exports = mongoose.model('Group', groupModel);