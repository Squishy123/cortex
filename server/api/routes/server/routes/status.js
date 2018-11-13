const express = require('express');
const router = express.Router();

//returns the server status
module.exports = {
    path: '/api',
    router: router.get('/', (req, res) => {
        return res.send({ status: "Cortex is online!" });
    })
}
