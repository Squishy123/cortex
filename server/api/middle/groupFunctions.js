const Boom = require('boom');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const Group = require('../model/group');

const User =- require('../../users/model/user');

const jwt = require('jsonwebtoken');

/**
 * Checks if a group share token is valid 
 * If yes, return the group if not return error
 * @param {Request} req 
 * @param {Handler} h 
 */
async function verifyShareToken(req, h) {
    try  {
        let verified = await Group.verifyShareToken(req.payload.share_token, process.env.SECRET);
        if (!verified.group) 
            return Boom.badRequest(verified.message);
        
        return verified.group;
    } catch (err) {
        return Boom.badRequest(err);
    }
}

async function verifyGroupAccess(req, h) {
    try {
        let user = req.pre.user;
        let group = await Group.findOne({_id: mongoose.Types.ObjectId((req.headers.group_id) ? req.headers.group_id : req.payload.group_id)});

        if(!group)
            return Boom.badRequest("Invalid group_id");

        if(!user) 
            return Boom.badRequest("Invalid user!");

         
        let verified = await group.verifyGroupAccess(user);
        if(!verified)
            return Boom.badRequest("User doesn't have access to this group");
        
        return group;
    } catch(err) {
        return Boom.badRequest(err);
    }
}

module.exports = {
    verifyShareToken: verifyShareToken,
    verifyGroupAccess: verifyGroupAccess
}