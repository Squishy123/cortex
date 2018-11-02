//mongodb connector
const mongoose = require('mongoose');

const connectDB = {
    name: 'connectDB',
    version: '0.0.1',
    //takes dbURL as an option var or env var
    register: async function(server, options) {
        //connect to mongodb
        await mongoose.connect((options.dbURL) ? dbURL : process.env.DB_URL);
        return;
    }
}

module.exports = connectDB;
