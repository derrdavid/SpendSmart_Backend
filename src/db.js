const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(console.log("connected to mongodb."))
        .catch((err) => console.log(err.message));
}

module.exports = connectDB;
