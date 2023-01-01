// required to be manually generated because of https://github.com/completecoding/serverless-auto-swagger/issues/45

export interface Technology {
	id: string;
	displayName: string;
	description: string;
	websiteUrl: string;
}

export type Technologies = Technology[];

export interface TechnologyCreateBody {
	displayName: string;
	description: string;
	websiteUrl: string;
}

export interface TechnologyCreateFormError {
	formErrors: string[];
	fieldErrors: {
		displayName?: string[] | undefined;
		description?: string[] | undefined;
		websiteUrl?: string[] | undefined;
	};
}

export interface TechnologyUpdateBody {
	displayName?: string | undefined;
	description?: string | undefined;
	websiteUrl?: string | undefined;
}

export interface TechnologyUpdateFormError {
	formErrors: string[];
	fieldErrors: {
		displayName?: string[] | undefined;
		description?: string[] | undefined;
		websiteUrl?: string[] | undefined;
	};
}
