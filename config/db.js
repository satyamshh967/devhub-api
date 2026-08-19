const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
};

module.exports = connectDB;