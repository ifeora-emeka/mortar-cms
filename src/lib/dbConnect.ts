// src/lib/dbConnect.ts
'use server'
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// @ts-ignore
let cached = global.mongoose ?? { conn: null, promise: null };
// @ts-ignore
global.mongoose = cached;

async function dbConnect() {
    if (cached.conn && mongoose.connection.readyState === 1) {
        console.log('Using existing connection');
        return cached.conn;
    }

    if (cached.promise) {
        console.log('Connection in progress, waiting for existing promise');
        return cached.promise;
    }

    try {
        console.log('Creating new connection to MongoDB');

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        const options = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 60000,
            connectTimeoutMS: 60000,
            maxPoolSize: 10,
            family: 4
        };

        cached.promise = mongoose.connect(String(MONGODB_URI), options).then((mongoose) => {
            console.log('MongoDB connection established successfully');
            return mongoose;
        });

        cached.conn = await cached.promise;

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            cached.conn = null;
            cached.promise = null;
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected');
            cached.conn = null;
            cached.promise = null;
        });

        return cached.conn;
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        cached.promise = null;
        cached.conn = null;
        throw error;
    }
}

export default dbConnect;