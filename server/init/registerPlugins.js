//colors
const colors = require('colors/safe');

module.exports = async function register(server, plugins) {
    let loaded = []
    plugins.forEach((p) => {
        loaded.push(p.config(server).then(() => {
            console.log(`${colors.cyan(p.name)}: ${colors.verbose(p.success)}`);
        }));
    });
    return await Promise.all(loaded);
}
