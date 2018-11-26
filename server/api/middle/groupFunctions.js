const Boom = require('boom');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const Group = require('../models/group');

const User = - require('../models/user');

const jwt = require('jsonwebtoken');

/**
 * Checks if a group share token is valid 
 * If yes, return the group if not send error
* @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyShareToken(req, res, next) {
    try {
        let verified = await Group.verifyShareToken(req.body.share_token, process.env.SECRET);
        if (!verified.group)
            return res.send(Boom.badRequest(verified.message));

        res.locals.user = verified.group;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}

/**
 * Checks if a user has access to a group
 * If yes, return the group else send error
 * @param {Request} req 
 * @param {Result} res 
 * @param {Callback} next 
 */
async function verifyGroupAccess(req, res, next) {
    try {
        let user = res.locals.user;
        let group = await Group.findOne({ _id: mongoose.Types.ObjectId((req.headers.group_id) ? req.headers.group_id : req.body.group_id) });

        if (!group)
            return res.send(Boom.badRequest("Invalid group_id"));

        if (!user)
            return res.send(Boom.badRequest("Invalid user!"));


        let verified = await group.verifyGroupAccess(user);
        if (!verified)
            return res.send(Boom.badRequest("User doesn't have access to this group"));

        res.locals.group = group;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}

module.exports = {
    verifyShareToken: verifyShareToken,
    verifyGroupAccess: verifyGroupAccess
}