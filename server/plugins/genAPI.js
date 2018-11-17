//file pattern matching
const glob = require('glob');

//file and dir paths
const path = require('path');

//colors
const colors = require('colors/safe');

//wrap middleware
const wrap = require('../api/middle/wrap');

const genAPI = {
    name: 'genAPI',
    version: '0.0.1',
    config: async function (server) {
        //generate routes in API directory
        glob.sync('../api/routes/**/*.js', {
            cwd: __dirname
        }).forEach((file) => {
            const route = require(path.join(__dirname, file));
            console.log(colors.data(`${colors.alert(route.method)}: ${colors.verbose(route.path)} generated!`));
            if (route.method === 'GET') {
                server.get(route.path, (route.handler) ? wrap(route.handler) : wrap(route.config.handler));
            } else if (route.method === 'PUT') {
                server.put(route.path, (route.handler) ? wrap(route.handler) : wrap(route.config.handler));
            } else if (route.method === 'POST') {
                server.post(route.path, (route.handler) ? wrap(route.handler) : wrap(route.config.handler));
            } else if (route.method === 'DELETE') {
                server.delete(route.path, (route.handler) ? wrap(route.handler) : wrap(route.config.handler));
            }
        });
    },
    success: "API Successfully Generated!"
}

module.exports = genAPI;

