//imports
const glob = require('glob');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//colors
const colors = require('colors/safe');

colors.setTheme({
    error: 'red',
    alert: 'yellow',
    data: 'white',
    verbose: 'green',
    wild: ['cyan', 'bgBlack'],
    sys: 'cyan'
});

//env vars
require('dotenv').config();

//server conf
const server = express();

//register plugins
const registerPlugins = require('./init/registerPlugins');


const init = async () => {
    //body parser
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    //register all files in server init
    let plugins = []
    glob.sync('plugins/*.js', {
        cwd: __dirname
    }).forEach((file) => {
        const plugin = require(path.join(__dirname, file));
        console.log(`${colors.sys(file)} : loaded`);
        plugins.push(plugin);
    });

    //enable cors
    server.options('*', cors());

    //register init plugins
    await registerPlugins(server, plugins);

    //start server
    await server.listen(3000 || process.env.PORT, 'localhost' || process.env.HOST);
    console.log(colors.sys(`Cortex Server running at: ${colors.verbose(`${'localhost' || process.env.HOST}:${3000 || process.env.PORT}`)}`));
}

init();