import {HandlerOptions, RequestMethod} from "../../types/request.types";
import {NextResponse} from "next/server";
import {validateRequestBody} from "../../lib/validation";
import {createCollectionSchema} from "../../types/collection.types";
import {CollectionsModel} from "./collections.model";
import {CollectionSchemaModel} from "../schemas/schemas.model";
import dbConnect from "../../lib/dbConnect";
import mongoose from "mongoose";

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
            case 'get-by-slug':
                return await this.getBySlug(this.segments[2]);
            case 'get-schema-by-slug':
                return await this.getSchemaBySlug(this.segments[2]);
            default:
                // if (this.action && mongoose.Types.ObjectId.isValid(this.action)) {
                //     return await this.getById(this.action);
                // }
                // if (this.segments[2] === 'schema' && mongoose.Types.ObjectId.isValid(this.action)) {
                //     return await this.getSchemaById(this.action);
                // }
                return this.handleInvalidAction();
        }
    }

    private async getAll() {
        try {
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

    private async getById(id: string) {
        try {
            const collection = await CollectionsModel.findById(id);
            
            if (!collection) {
                return NextResponse.json({
                    message: 'Collection not found',
                    error: 'Not found'
                }, { status: 404 });
            }
            
            return NextResponse.json({
                message: 'Collection retrieved successfully',
                data: collection,
            });
        } catch (error) {
            console.error('Error retrieving collection:', error);
            return NextResponse.json({
                message: 'Error retrieving collection',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }
    
    private async getBySlug(slug: string) {
        try {
            if (!slug) {
                return NextResponse.json({
                    message: 'Missing slug parameter',
                    error: 'Bad request'
                }, { status: 400 });
            }
            
            const collection = await CollectionsModel.findOne({ slug });
            
            if (!collection) {
                return NextResponse.json({
                    message: 'Collection not found',
                    error: 'Not found'
                }, { status: 404 });
            }
            
            return NextResponse.json({
                message: 'Collection retrieved successfully',
                data: collection,
            });
        } catch (error) {
            console.error('Error retrieving collection:', error);
            return NextResponse.json({
                message: 'Error retrieving collection',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }
    
    private async getSchemaById(collectionId: string) {
        try {
            const schema = await CollectionSchemaModel.findOne({ collection: collectionId });
            
            if (!schema) {
                return NextResponse.json({
                    message: 'Schema not found for this collection',
                    error: 'Not found'
                }, { status: 404 });
            }
            
            return NextResponse.json({
                message: 'Schema retrieved successfully',
                data: schema,
            });
        } catch (error) {
            console.error('Error retrieving schema:', error);
            return NextResponse.json({
                message: 'Error retrieving schema',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }
    
    private async getSchemaBySlug(slug: string) {
        try {
            if (!slug) {
                return NextResponse.json({
                    message: 'Missing slug parameter',
                    error: 'Bad request'
                }, { status: 400 });
            }
            
            // First find the collection by slug to get its ID
            const collection = await CollectionsModel.findOne({ slug });
            
            if (!collection) {
                return NextResponse.json({
                    message: 'Collection not found',
                    error: 'Not found'
                }, { status: 404 });
            }
            
            // Then find the schema using the collection ID
            const schema = await CollectionSchemaModel.findOne({ collection: collection._id });
            
            if (!schema) {
                return NextResponse.json({
                    message: 'Schema not found for this collection',
                    error: 'Not found'
                }, { status: 404 });
            }
            
            return NextResponse.json({
                message: 'Schema retrieved successfully',
                data: schema,
            });
        } catch (error) {
            console.error('Error retrieving schema:', error);
            return NextResponse.json({
                message: 'Error retrieving schema',
                error: (error as Error).message,
                stack: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined
            }, { status: 500 });
        }
    }

    private async create() {
        try {
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

                const defaultSchema = new CollectionSchemaModel({
                    collection: savedCollection._id,
                    schema: [
                        {
                            validation: {
                                required: true,
                            },
                            field: {
                                label: 'Name',
                                type: 'string',
                                key: 'name',
                                isStatic: true,
                                autoGenerated: false,
                                placeholder: 'Enter a name',
                            }
                        },
                        {
                            validation: {
                                required: true,
                            },
                            field: {
                                label: 'Slug',
                                type: 'string',
                                key: 'slug',
                                isStatic: true,
                                autoGenerated: true,
                                placeholder: 'auto-generated-slug',
                                deriveValueFrom: 'name'
                            }
                        }
                    ]
                });

                const savedSchema = await Promise.race([
                    defaultSchema.save(),
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Schema save operation timed out')), 30000)
                    )
                ]);

                return NextResponse.json({
                    message: 'Collection created successfully',
                    data: {
                        collection: savedCollection,
                        schema: savedSchema
                    },
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