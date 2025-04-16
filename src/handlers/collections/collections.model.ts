import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            trim: true,
            unique: true,
            lowercase: true,
            match: [/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"],
        },
        description: {
            type: String,
            required: false,
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
    },
    {
        timestamps: true,
        collection: 'collections', // Explicitly set collection name
    }
);

export const CollectionsModel =
    mongoose.models.Collections ||
    mongoose.model("Collections", collectionSchema);