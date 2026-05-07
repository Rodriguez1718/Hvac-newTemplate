import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    draft: z.boolean().default(false),
    sections: z.array(
      z.object({
        component: z.string(),
        props: z.record(z.string(), z.any()).optional(),
      })
    ).default([]),
  }),
})

export const collections = { pages }
