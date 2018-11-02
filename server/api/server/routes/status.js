module.exports = {
    method: 'GET',
    path: '/api',
    config: {
        //find all the users, deselect password and version and return it
        handler:  (req, h) => {
            return {status: "Cortex is online!"}
        }
    }
}