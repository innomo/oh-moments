import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: z.string(),
    shortDescription: z.string(),
    description: z.string(),
    price: z.number().optional(),
    sku: z.string().optional(),
    images: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { products };
