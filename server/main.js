//imports
const glob = require('glob');
const express = require('express');
const path = require('path');

//env vars
require('dotenv').config();

//server conf
const server = express();

const init = async () => {
    //register all files in server init
    plugins = []
    glob.sync('init/*.js', {
        cwd: __dirname
    }).forEach((file) => {
        const plugin = require(path.join(__dirname, file));
        console.log(`Loaded: ${file}`)
        plugins.push(plugin);
    });

    //register init plugins
    //await server.register(plugins);

    //start server
    await server.listen(3000 || process.env.PORT, 'localhost' || process.env.HOST);
    console.log(`Cortex Server running at: ${ 'localhost' || process.env.HOST}:${3000 || process.env.PORT}`);

    //tester routes
    const status = require('./api/server/routes/status');
    server.use(status.path, status.router);
}

init();