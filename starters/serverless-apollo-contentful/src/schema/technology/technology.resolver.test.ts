import { Maybe, ResolverTypeWrapper, Technology } from "../../generated/graphql";
import { TechnologyModel } from "../../models/TechnologyModel";
import { MockedClass } from "jest-mock";
import { technologyResolvers } from "./technology.resolvers";
import assert from "node:assert";
import { GraphQLResolveInfo } from "graphql";
import { Entry } from "contentful-management";

jest.mock("../../models/TechnologyModel", () => ({
	TechnologyModel: {
		get: jest.fn(),
		getAll: jest.fn()
	}
}));
const MOCK_TECHNOLOGY_MODEL = (TechnologyModel as MockedClass<typeof TechnologyModel>);
const MOCK_ENTRY = {
	sys: {
		id: "1"
	},
	fields: {
		displayName: { "en-US": "MOCK_DISPLAY_NAME" },
		description: { "en-US": "MOCK_DESCRIPTION" },
		url: { "en-US": "MOCK_URL" }
	}
} as unknown as Entry;

describe("technologyResolvers", () => {
	describe(".Query", () => {
		describe(".technology", () => {
			describe("when called with id 1", () => {
				let technologies: Maybe<Maybe<ResolverTypeWrapper<Technology>>[]>;
				MOCK_TECHNOLOGY_MODEL.get.mockResolvedValue(MOCK_ENTRY);

				beforeAll(async () => {
					assert(typeof technologyResolvers.Query?.technology === "function");
					technologies = await technologyResolvers.Query.technology({}, { id: "1" }, {}, {} as GraphQLResolveInfo);
				});

				it("returns technology with id 1", () => {
					expect(technologies?.[0]).toHaveProperty("id", "1");
				});
			});

			describe("when called without id", () => {
				// Do same as above, but with 2+ entries
			});
		});
	});
});
