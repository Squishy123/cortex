const Boom = require('boom');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const Group = require('../model/group');

const jwt = require('jsonwebtoken');

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