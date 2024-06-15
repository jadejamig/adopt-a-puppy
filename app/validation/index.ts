import { z } from "zod";

export const petSchema = z.object({
    name: z.string().min(1).max(50),
    age: z.string().min(1).max(2),
    ageLabel: z.literal('Puppy').or(z.literal('Adult')).or(z.literal('Senior')),
    breed: z.string().min(1).max(50),
    gender: z.literal('Male').or(z.literal('Female')),
    location: z.string().min(1).max(50),
    image: z.string(),
    size: z.literal('Small').or(z.literal('Medium')).or(z.literal('Large')),
})