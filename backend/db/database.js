import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);
        console.log(`Successfully connected to database: ${connection.connection.host}`);
    } catch (error) {
        console.log("Failed to connect to database:", error.message);
    }
};
