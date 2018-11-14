//file pattern matching
const glob = require('glob');

//file and dir paths
const path = require('path');

const genAPI = {
    name: 'genAPI',
    version: '0.0.1',
    config: async function (server) {
        //generate routes in API directory
        glob.sync('../api/**/routes/*.js', {
            cwd: __dirname
        }).forEach((file) => {
            const route = require(path.join(__dirname, file));
            server.route(route);
        });
        return;
    },
    success: "API Successfully Generated!"
}

module.exports = genAPI;

