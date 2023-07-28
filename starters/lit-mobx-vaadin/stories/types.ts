import { TemplateResult } from "lit";

export type Story<T>  = {
	(args: T): TemplateResult;
	args?: Partial<T>;
	argTypes?: Record<string, unknown>;
}