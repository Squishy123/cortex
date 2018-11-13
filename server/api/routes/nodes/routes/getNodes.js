module.exports = {
    method: 'GET',
    path: '/api/nodes',
    config: {
        handler: async(req, h) => {
            try {
                return;
            } catch(err) {
                return Boom.badRequest(err);
            }
        }
    }
}