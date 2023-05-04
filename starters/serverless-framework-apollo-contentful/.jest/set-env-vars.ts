const MOCK_ENV_VARS = {
	CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN: 'MOCK_CONTENTFUL_CONTENT_MANAGEMENT_API_TOKEN',
	CONTENTFUL_SPACE_ID: 'MOCK_CONTENTFUL_SPACE_ID',
	CONTENTFUL_ENVIRONMENT: 'MOCK_CONTENTFUL_ENVIRONMENT',
};
process.env = { ...process.env, ...MOCK_ENV_VARS };
