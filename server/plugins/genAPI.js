//file pattern matching
const glob = require('glob');

//file and dir paths
const path = require('path');

//colors
const colors = require('colors/safe');

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
            try {
                if (route.path === 'GET') {
                    server.get(route.path, route.handler);
                } else if (route.path === 'PUT') {
                    server.put(route.path, route.handler);
                } else if (route.path === 'POST') {
                    server.post(route.path, route.handler);
                } else if (route.path === 'DELETE') {
                    server.delete(route.path, route.handler);
                }
            } catch (err) {
                console.log(err);
            }
        });
    },
    success: "API Successfully Generated!"
}

module.exports = genAPI;

