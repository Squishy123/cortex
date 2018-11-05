const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

//schema for a group
const groupModel = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    secret_id: { type: String, index: { unique: true } },
    users: [{ user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, scopes: [String] }],
    clusters: [{ cluster_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cluster' } }]
});

/**
 * Creates a share token based on the scope
 * @param {enum ["owner", "edit", "view"]} scopes 
 */
groupModel.method.createShareToken = async function (scopes) {
    return await jwt.sign({ group_id: this._id, secret_id: this.secret_id, scopes: scopes });
}

/**
 * Add a user with a given scope to the group
 * @param {User} user 
 * @param {enum ["owner", "edit", "view"]} scopes 
 */
groupModel.method.addUser = async function (user, scopes) {
    this.users.push({ user_id: user._id, scopes: scopes });
    await this.save()
}

groupModel.statics.verifyShareToken = async function (shareToken) {
    try {
        let decoded = await jwt.decode(shareToken, process.env.SECRET);
        let group = await this.findOne({
            $and: [
                {secret_id: decoded.secret_id},
                {group_id: decoded.group_id}
            ]
        });

        //if the group is null
        if(!group)
            return {group: group, share_token: false, message: "Share token is invalid"};
        
        return {group: group,  share_token: true, message: "Success"};
    } catch(err) {
        return err;
    }
}

module.exports = mongoose.model('Group', groupModel);