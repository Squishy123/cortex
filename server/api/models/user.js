const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

//schema for users
const userModel = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    groups: [{group_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, scopes: [String]}]
});


/**
 * Adds the hashed password to the password field of a user object
 * @param {String} password 
 */
userModel.methods.addHashedPassword = async function(password) {
    hashed = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) reject(err)
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) reject(err);
                resolve(hash);
            });
        });
    });
    this.password=hashed;
}

/**
 * Creates a jwt access_token and returns it
 */
userModel.methods.createAccessToken = async function() {
    return await jwt.sign({user_id: this._id, username: this.username}, process.env.SECRET, {algorithm: 'HS256', expiresIn: "1h"});   
}

/**
 * Given a jwt access token, if the token is valid, return the user, if not then null
 * @param {JWT} accessToken 
 */
userModel.statics.verifyAccessToken = async function(accessToken) {
    try {
        let decoded = await jwt.verify(accessToken, process.env.SECRET);
        let user = await this.findOne(mongoose.Types.ObjectId(decoded.user_id));
        if(!user) 
            return {user: user, access_token: false, message: "Invalid access token"};
        return {user: user, access_token: true, message: "Success"};
    } catch (err) {
        return err;
    }
};

/**
 * Given a username and email, check if the username or email are taken
 * @param {String} username 
 * @param {String} email 
 */
userModel.statics.verifyUniqueUser = async function(username, email) {
    try {
        //find an entry in the database that matches either email or username
        let user = await this.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        //if username or email are taken, return unique false
        if (user) {
            if (user.username === username)
                return {user: user, unique: false, message: "username already taken"};
            if (user.email === email)
                return {user: user, unique: false, message: "email already taken"};
        }
        //if user is unique send the payload through the route handler
        return {user: user, unique: true, message: "success"};
    } catch (err) {
        return err;
    }
};

userModel.statics.verifyCredentials = async function(username, email, password) {
    try {
        let user = await this.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });
        if(!user) 
            return {user: null, credentials: false, message: "incorrect username or password"};
        
        let valid = await bcrypt.compare(password, user.password);
        
        //return null if the user does not exist or if credentials are wrong
        if (!valid)
            return {user: null, credentials: false, message: "incorrect password"};
        //return the user if the user credentials are correct
        return {user: user, credentials: true, message: "success"};
    } catch (err) {
        //return err if something goes wrong
        return err;
    }
}


module.exports = mongoose.model('User', userModel);