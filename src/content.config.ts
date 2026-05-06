import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { navigate } from 'astro:transitions/client';

const abilitySchema = z.object({
  name: z.string(),
  cost: z.string().optional(),
  description: z.string(),
});

const sequenceSchema = z.object({
  number: z.number(),
  name: z.string(),
  sequence_description: z.string().optional(),
  attribute_gains: z.string().optional(),
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

const itemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/characters' }),
  schema: z.object({
    basicInformation: z.object({
      name: z.string(),
      age: z.number().optional(),
      race: z.string().optional(),
      gender: z.string().optional(),
      occupation: z.string().optional(),
      pathway: z.string(),
      sequence: z.number(),
    }),
    attributes: z.object({
      strength: z.number(),
      agility: z.number(),
      willpower: z.number(),
      physique: z.number(),
      charisma: z.number(),
      inspiration: z.number(),
      luck: z.number(),
      education: z.number(),
    }),
    stats: z.object({
      life: z.number(),
      spirituality: z.number(),
      rationality: z.number(),
      luck: z.number(),
    }),
    skillsAttributes: z.object({
      strengthBased: z.object({
        climbing: z.number(),
        throwing: z.number(),
        fighting: z.number(),
        intimidation: z.number(),
        jumping: z.number(),
        animalTaming: z.number(),
      }),
      agilityBased: z.object({
        stealth: z.number(),
        sleightOfHand: z.number(),
        swimming: z.number(),
        shooting: z.number(),
        camouflage: z.number(),
        lockpicking: z.number(),
        pilot: z.number(),
        heavyMachinery: z.number(),
        dodge: z.number(),
        extraEvasion: z.number(),
      }),
      charismaBased: z.object({
        pleasing: z.number(),
        deception: z.number(),
        speech: z.number(),
        persuasion: z.number(),
        psychoanalysis: z.number(),
        performance: z.number(),
        disguise: z.number(),
        credibility: z.number(),
      }),
      inspirationBased: z.object({
        listen: z.number(),
        investigate: z.number(),
        reparing: z.number(),
        mysticism: z.number(),
        psychology: z.number(),
        cooking: z.number(),
        arts: z.number(),
        pursue: z.number(),
        readLips: z.number(),
      }),
      education: z.object({
        navigate: z.number(),
        trading: z.number(),
        medicine: z.number(),
        libraryUsage: z.number(),
        writing: z.number(),
        demolition: z.number(),
        survival: z.number(),
        naturalScience: z.number(),
        laws: z.number(),
        archeology: z.number(),
        religion: z.number(),
        astronomy: z.number(),
      })
    }),
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
