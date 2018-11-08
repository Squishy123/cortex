//mongodb connector
const mongoose = require('mongoose');

const connectDB = {
    name: 'connectDB',
    version: '0.0.1',
    //takes dbURL as an option var or env var
    register: async function(server) {
        //connect to mongodb
        await mongoose.connect(process.env.DB_URL);
        return;
    }
}

module.exports = connectDB;
