const mongoose = require('mongoose');
require("dotenv").config();
//database configuraton done connection using mongoose
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
    }).then(() => console.log("Db connected suceessfully"))
    .catch ((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
};