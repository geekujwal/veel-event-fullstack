const  mongoose  = require("mongoose");
const logger = require('pino')()

module.exports.connectDb = () => {
    mongoose
        .connect("mongodb+srv://teleph0nes:wj48Xaal86C9XWvX@veel-event-db.h8f50.mongodb.net/?retryWrites=true&w=majority&appName=veel-event-db")
        .then(() => {
            logger.info("Database connected.")
        })
        .catch(() => {
            console.error("An error occurred while connecting to database");
            logger.error("Database connection error.")
        });
};