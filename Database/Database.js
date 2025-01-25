const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is Connected");

    } catch (error) {
        console.log("Database is not connected");
    }
}

module.exports = ConnectDB;