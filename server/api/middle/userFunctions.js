const Boom = require('boom');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const User = require('../models/user');

const jwt = require('jsonwebtoken');

/**
 * Checks to see if a user is unique
 * if yes set res.locals.user to user, else send error
 * @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyUniqueUser(req, res, next) {
    try {
        let verified = await User.verifyUniqueUser(req.body.username, req.body.email);
        if (!verified.unique)
            return res.send(Boom.badRequest(verified.message));
        res.locals.user = verified.user;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }
    if (next)
        next();
}

/**
 * Checks to see if a user's credentials are correct
 * if yes return the user, if not send error
* @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyCredentials(req, res, next) {
    try {
        let verified = await User.verifyCredentials(req.body.username, req.body.email, req.body.password);
        if (!verified.credentials)
            return res.send(Boom.badRequest(verified.message));
        res.locals.user = verified.user;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }
    if (next)
        next();
}

/**
 * Checks to see if a user's access token is valid
 * If yes return the user, if not send error
* @param {Request} req 
 * @param {Result} res
 * @param {Callback} next
 */
async function verifyAccessToken(req, res, next) {
    try {
        let verified = await User.verifyAccessToken(req.headers.access_token);
        if (!verified.access_token)
            return res.send(Boom.badRequest(verified.message));
         res.locals.user = verified.user;
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }

    if (next)
        next();
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials,
    verifyAccessToken: verifyAccessToken
}