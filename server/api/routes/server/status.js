const express = require('express');
const router = express.Router();

//returns the server status
module.exports = {
    method: 'GET',
    path: '/api',
    handler: (req, res) => {
        res.send({status: "Cortex is online!"})
    }
}
