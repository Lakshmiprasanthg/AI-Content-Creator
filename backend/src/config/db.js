import mongoose from 'mongoose';

export const connectDB = async () => {
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) {
    console.error('Missing MONGO_URI environment variable');
    throw new Error('Missing MONGO_URI environment variable');
  }
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    throw new Error(`MongoDB connection failed: ${err.message}`);
  }
};
