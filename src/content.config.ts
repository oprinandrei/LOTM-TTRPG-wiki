import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const abilitySchema = z.object({
  name: z.string(),
  cost: z.string().optional(),
  description: z.string(),
});

const sequenceSchema = z.object({
  number: z.number(),
  name: z.string(),
  potion: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  abilities: z.array(abilitySchema).optional(),
});

const pathways = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/pathways' }),
  schema: z.object({
    name: z.string(),
    spoiler_free_name: z.string().optional(),
    description: z.string(),
    sequences: z.array(sequenceSchema),
  }),
});

const skillSchema = z.object({
  attribute: z.enum(['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']),
  proficient: z.boolean(),
});

const itemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/characters' }),
  schema: z.object({
    name: z.string(),
    pathway: z.string(),
    sequence: z.number(),
    sequenceName: z.string(),
    background: z.string().optional(),
    hp: z.object({ max: z.number() }),
    sanity: z.object({ max: z.number() }),
    digestion: z.object({
      total: z.number(),
      digested: z.number(),
    }),
    attributes: z.object({
      strength: z.number(),
      dexterity: z.number(),
      constitution: z.number(),
      intelligence: z.number(),
      wisdom: z.number(),
      charisma: z.number(),
    }),
    skills: z.record(z.string(), skillSchema).optional(),
    abilities: z.array(abilitySchema).optional(),
    items: z.array(itemSchema).optional(),
  }),
});

const npcs = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/npcs' }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
    difficulty: z.string().optional(),
    abilities: z.array(abilitySchema).optional(),
    loot: z.array(z.string()).optional(),
  }),
});

const rules = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/rules' }),
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    description: z.string().optional(),
  }),
});

export const collections = { pathways, characters, npcs, rules };
