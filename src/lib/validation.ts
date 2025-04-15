import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Validates request body against a Zod schema
 * @param schema Zod schema to validate against
 * @param request Request object containing the body to validate
 * @returns Object with validation result and data/error
 */
export async function validateRequestBody<T extends z.ZodType>(
    schema: T,
    request: Request
): Promise<
    | { success: true; data: z.infer<T> }
    | { success: false; error: NextResponse }
> {
    try {
        const body = await request.json();
        const result = schema.safeParse(body);

        if (!result.success) {
            return {
                success: false,
                error: NextResponse.json({
                    message: 'Validation failed',
                    errors: result.error.errors
                }, { status: 400 })
            };
        }

        return { success: true, data: result.data };
    } catch (error) {
        return {
            success: false,
            error: NextResponse.json({
                message: 'Error parsing request body',
                error: (error as Error).message
            }, { status: 400 })
        };
    }
}