const enableCors = {
    name: 'enableCors',
    version: '0.0.1',
    //register auth jwt2
    config: async function (server) {
        try {
            server.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

            return;
        } catch (err) {
            return err;
        }
    },
    success: "Cors Enabled!"
}

module.exports = enableCors;