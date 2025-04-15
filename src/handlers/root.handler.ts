import {NextResponse} from 'next/server';
import CollectionsHandler from "./collections/collections.handler";
import dbConnect from "../lib/dbConnect";

export class RootHandler {
    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            await dbConnect();
        } catch (error) {
            //@ts-ignore
            console.error('Failed to initialize database connection:', error?.message);
        }
    }

    async HANDLE_GET(
        request: Request,
        {params}: { params: { segments: string[] } }
    ) {
        const segments = params.segments;
        console.log({segments, url: request.url});


        return NextResponse.json({
            message: 'GET request received',
            segments,
            body: request.json(),
        });
    }

    async HANDLE_POST(
        request: Request,
        { params }: { params: { segments: string[] } }
    ) {
        const segments = params.segments;

        // /api/kyper/collections/:collection/:action
        // /api/kyper/schema

        switch (segments[0]) {
            case 'collections': {
                const handler = new CollectionsHandler({
                    segments,
                    request,
                    method: 'POST',
                    params: { segments },
                });
                return await handler.handleAction(); // Ensure the response is returned
            }
            default:
                return NextResponse.json(
                    {
                        message: 'Bad Request',
                        error: 'Invalid route',
                        segments,
                    },
                    { status: 400 }
                );
        }
    }

    async HANDLE_PUT(
        request: Request,
        {params}: { params: { segments: string[] } }
    ) {
        const segments = params.segments;
        console.log(segments);
        const body = await request.json();
        return NextResponse.json({
            message: 'PUT request received',
            segments,
            body,
        });
    }

    async HANDLE_PATCH(
        request: Request,
        {params}: { params: { segments: string[] } }
    ) {
        const segments = params.segments;
        console.log(segments);
        const body = await request.json();
        return NextResponse.json({
            message: 'PATCH request received',
            segments,
            body,
        });
    }

    async HANDLE_DELETE(
        request: Request,
        {params}: { params: { segments: string[] } }
    ) {
        const segments = params.segments;
        console.log(segments);
        return NextResponse.json({
            message: 'DELETE request received',
            segments,
        });
    }

    async HANDLE_OPTIONS(
        request: Request,
        {params}: { params: { segments: string[] } }
    ) {
        const segments = params.segments;
        console.log(segments);
        return new NextResponse(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        });
    }
}