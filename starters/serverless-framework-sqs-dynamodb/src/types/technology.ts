import { z } from 'zod';

export type Technology = {
	id: string;
	displayName: string;
	description: string;
	websiteUrl: string;
};

export const TechnologyCreateSchema = z.object({
	displayName: z.string(),
	description: z.string().min(10),
	websiteUrl: z.string().url(),
});

export type TechnologyCreate = z.infer<typeof TechnologyCreateSchema>;

export const TechnologyUpdateSchema = z.object({
	displayName: z.string().optional(),
	description: z.string().min(10).optional(),
	websiteUrl: z.string().url().optional(),
});

export type TechnologyUpdate = z.infer<typeof TechnologyUpdateSchema>;
