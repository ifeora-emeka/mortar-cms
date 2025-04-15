import {HandlerOptions, RequestMethod} from "../../types/request.types";
import {NextResponse} from "next/server";
import {validateRequestBody} from "../../lib/validation";
import {createCollectionSchema} from "../../types/collection.types";
import {CollectionsModel} from "./collections.model";
import dbConnect from "../../lib/dbConnect";


export default class CollectionsHandler {
    private segments: string[];
    private collection: string | undefined;
    private action: string | undefined;
    private request: Request;

    constructor(options: HandlerOptions) {
        this.segments = options.segments;
        this.collection = options.segments[0];
        this.action = options.segments[1];
        this.request = options.request;
    }

    public async handleAction() {
        switch (this.action) {
            case 'create':
                return await this.create();
            case 'get-all':
                return await this.getAll();
            default:
                return this.handleInvalidAction();
        }
    }

    private async getAll() {
        try {
            const connection = await dbConnect();
            if (!connection) {
                return NextResponse.json({
                    message: 'Failed to connect to database',
                    error: 'Database connection failed'
                }, { status: 500 });
            }

            const collections = await CollectionsModel.find({})
                .sort({ createdAt: -1 }) // Sort by newest first
                .select('name slug description createdAt updatedAt'); // Select only needed fields
            
            return NextResponse.json({
                message: 'Collections retrieved successfully',
                data: collections,
            });
        } catch (error) {
            console.error('Error retrieving collections:', error);
            return NextResponse.json({
                message: 'Error retrieving collections',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }

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
                return validation.error;
            }

            const {name, slug, description} = validation.data;

            try {
                const existingCollection = await CollectionsModel.findOne({ slug });
                if (existingCollection) {
                    return NextResponse.json({
                        message: 'Collection with this slug already exists',
                        error: 'Duplicate slug'
                    }, { status: 409 });
                }

                const newCollection = new CollectionsModel({
                    name,
                    slug,
                    description,
                });

                const savedCollection = await Promise.race([
                    newCollection.save(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Save operation timed out')), 30000)
                    )
                ]);

                return NextResponse.json({
                    message: 'Collection created successfully',
                    data: savedCollection,
                });
            } catch (saveError) {
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