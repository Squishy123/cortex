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
    next();
}

/**
 * Checks to see if a user's credentials are correct
 * if yes return the user, if not return error
 * @param {Request} req 
 * @param {Handler} h 
 */
async function verifyCredentials(req, res, next) {
    try {
        let verified = await User.verifyCredentials(req.payload.username, req.payload.email, req.payload.password);
        if (!verified.credentials)
            (Boom.badRequest(verified.message));

        next(verified.user);
    } catch (err) {
        next(Boom.badRequest(err));
    }
}

/**
 * Checks to see if a user's access token is valid
 * If yes return the user, if not return error
 * @param {Request} req 
 * @param {Handler} h 
 */
async function verifyAccessToken(req, h) {
    try {
        let verified = await User.verifyAccessToken(req.headers.access_token);
        if (!verified.access_token)
            return Boom.badRequest(verified.message)

        return verified.user;

    } catch (err) {
        return Boom.badRequest(err);
    }
}

module.exports = {
    verifyUniqueUser: verifyUniqueUser,
    verifyCredentials: verifyCredentials,
    verifyAccessToken: verifyAccessToken
}