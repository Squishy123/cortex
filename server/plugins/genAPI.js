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
            //wrap all middleware in async wrapper
            let handler = (route.handler) ? wrap(route.handler) : wrap(route.config.handler);
            let pre = (route.pre) ? route.pre.map(middle => wrap(middle)) : null;
            let params = [route.path];
            params.push(handler);

            //check if pre is null
            if (pre) {
                //    params = params.concat(pre);
                server.use(route.path, pre);
            }


            if (route.method === 'GET') {
                server.get(...params);
            } else if (route.method === 'PUT') {
                server.put(...params);
            } else if (route.method === 'POST') {
                server.post(...params);
            } else if (route.method === 'DELETE') {
                server.delete(...params);
            }
        });
    },
    success: "API Successfully Generated!"
}

module.exports = genAPI;

