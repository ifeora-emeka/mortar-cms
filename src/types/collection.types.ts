import z from 'zod'

export type Collection = {
    _id: string;
    name: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export const createCollectionSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(500).nullable(),
    slug: z.string().min(1).max(50),
}).strict()
