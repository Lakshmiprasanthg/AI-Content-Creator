import mongoose from 'mongoose';

export const connectDB = async () => {
  const { MONGO_URI } = process.env;
  if (!MONGO_URI) {
    console.error('Missing MONGO_URI environment variable');
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      autoIndex: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('Mongo connection error:', err.message);
    process.exit(1);
  }
};
