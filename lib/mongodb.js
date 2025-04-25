import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://ankitkaushal882:zyK1E0P5ies4eegg@cluster0.pylq1yt.mongodb.net/truthanddare?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Mongoose connection for existing functionality
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("DB Connected Successfully");
      return mongoose;
    }).catch((e)=>{
      console.log("No connection",e);
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// MongoDB connection for NextAuth
let client;
let clientPromise;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export { clientPromise };
export default connectToDatabase;
