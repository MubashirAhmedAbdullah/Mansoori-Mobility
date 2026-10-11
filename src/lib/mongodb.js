import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    // Keep this check inside the connector so the marketing site/demo UI can run
    // without a database. Any API that persists data will return a safe error.
}
const globalWithMongoose = globalThis;
const cached = globalWithMongoose.mongooseCache ?? { conn: null, promise: null };
globalWithMongoose.mongooseCache = cached;
export async function connectToDatabase() {
    if (!MONGODB_URI)
        throw new Error("Database is not configured. Add MONGODB_URI to .env.local.");
    if (cached.conn)
        return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((instance) => instance);
        console.log("database is sussecsulyy connected")
    }
    cached.conn = await cached.promise;
    return cached.conn;
}
