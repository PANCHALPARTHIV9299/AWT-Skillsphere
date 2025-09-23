import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri) {
  const uri = mongoUri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Skill_Sphere';
  await mongoose.connect(uri);
  return mongoose.connection;
}


