const Boom = require('boom');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const User = require('../model/user');

const jwt = require('jsonwebtoken');

/**
 * Checks to see if a user is unique
 * if yes return the user, if not return error
 * @param {Request} req 
 * @param {Handler} h 
 */
async function verifyUniqueUser(req, res, next) {
    try {
        let verified = await User.verifyUniqueUser(req.payload.username, req.payload.email);
        if (!verified.unique)
            return res.send(Boom.badRequest(verified.message));

        return res.send(verified.user);
    } catch (err) {
        return res.send(Boom.badRequest(err));
    }
}

/**
 * Checks to see if a user's credentials are correct
 * if yes return the user, if not return error
 * @param {Request} req 
 * @param {Handler} h 
 */
async function verifyCredentials(req, h) {
    try {
        let verified = await User.verifyCredentials(req.payload.username, req.payload.email, req.payload.password);
        if (!verified.credentials)
            return Boom.badRequest(verified.message);

        return verified.user;
    } catch (err) {
        return Boom.badRequest(err);
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