//imports
const glob = require('glob');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//env vars
require('dotenv').config();

//server conf
const server = express();

//register plugins
const registerPlugins = require('./init/registerPlugins');


const init = async () => {
    //register all files in server init
    let plugins = []
    glob.sync('plugins/*.js', {
        cwd: __dirname
    }).forEach((file) => {
        const plugin = require(path.join(__dirname, file));
        console.log(`Loaded: ${file}`)
        plugins.push(plugin);
    });

    //register init plugins
    await registerPlugins(server, plugins);

    //start server
    await server.listen(3000 || process.env.PORT, 'localhost' || process.env.HOST);
    console.log(`Cortex Server running at: ${'localhost' || process.env.HOST}:${3000 || process.env.PORT}`);

    //body parser
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    //tester routes
    const status = require('./api/routes/server/status');
    server.use(status.path, status.handler);
}

init();