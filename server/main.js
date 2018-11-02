//imports
const glob = require('glob');
const Hapi = require('hapi');
const path = require('path');

//env vars
require('dotenv').config();

//server conf
const server = Hapi.Server({
    host: 'localhost' || process.env.HOST,
    port: 3000 || process.env.PORT
});

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
    await server.register(plugins);

    //start server
    await server.start();
    console.log(`Cortex Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();