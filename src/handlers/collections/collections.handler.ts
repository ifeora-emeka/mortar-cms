import {HandlerOptions, RequestMethod} from "../../types/request.types";
import {NextResponse} from "next/server";
import {validateRequestBody} from "../../lib/validation";
import {createCollectionSchema} from "../../types/collection.types";
import {CollectionsModel} from "./collections.model";
import dbConnect from "../../lib/dbConnect";
import mongoose from 'mongoose'; // Add this import

export default class CollectionsHandler {
    private segments: string[];
    private collection: string | undefined;
    private action: string | undefined;
    private request: Request;

    constructor(options: HandlerOptions) {
        this.segments = options.segments;
        this.collection = options.segments[1];
        this.action = options.segments[2];
        this.request = options.request;
    }

    public async handleAction() {
        switch (this.action) {
            case 'create':
                return await this.create();
            default:
                return this.handleInvalidAction();
        }
    }

    // In src/handlers/collections/collections.handler.ts
    private async create() {
        try {
            const connection = await dbConnect();
            if (!connection) {
                return NextResponse.json({
                    message: 'Failed to connect to database',
                    error: 'Database connection failed'
                }, { status: 500 });
            }

            const validation = await validateRequestBody(createCollectionSchema, this.request);
            if (!validation.success) {
                console.log('VALIDATION RESULT:::', validation);
                return validation.error;
            }

            const {name, slug, description} = validation.data;
            console.log('INCOMING DATA:', {name, slug, description});

            try {
                // Check if a collection with the same slug already exists
                const existingCollection = await CollectionsModel.findOne({ slug });
                if (existingCollection) {
                    return NextResponse.json({
                        message: 'Collection with this slug already exists',
                        error: 'Duplicate slug'
                    }, { status: 409 });
                }

                // Create document using the model directly
                const newCollection = new CollectionsModel({
                    name,
                    slug,
                    description,
                });

                // Set timeout for the operation
                const savedCollection = await Promise.race([
                    newCollection.save(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Save operation timed out')), 30000)
                    )
                ]);

                console.log('Document saved:', savedCollection);

                return NextResponse.json({
                    message: 'Collection created successfully',
                    data: savedCollection,
                });
            } catch (saveError) {
                console.error('Error saving collection:', saveError);
                return NextResponse.json({
                    message: 'Error saving collection to database',
                    error: (saveError as Error).message
                }, { status: 500 });
            }
        } catch (error) {
            console.error('Error creating collection:', error);
            return NextResponse.json({
                message: 'Error processing collection request',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }

    private handleInvalidAction() {
        return NextResponse.json({
            message: 'Invalid action',
            action: this.action,
            collection: this.collection,
        }, {status: 400});
    }
}