module.exports = async function register(server, plugins) {
    let loaded = []
    plugins.forEach((p) => {
        loaded.push(p.config().then(() => {
            console.log(`${p.name}: ${p.success}`);
        }));
    });
    return await Promise.all(loaded);
}
