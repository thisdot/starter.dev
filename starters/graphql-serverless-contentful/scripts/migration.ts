import { getEnvironment } from '../src/utils/contentful';

(async () => {
	console.log('Migrating database...');

	const environment = await getEnvironment();

	if (await environment.getContentType('technology')) {
		console.log('Technology Content Type exists');
		return;
	}

	const technology = await environment.createContentTypeWithId('technology', {
		name: 'Technology',
		fields: [
			{
				id: 'displayName',
				name: 'Display Name',
				required: true,
				localized: true,
				type: 'Text',
			},
			{
				id: 'description',
				name: 'Description',
				required: false,
				localized: true,
				type: 'Text',
			},
			{
				id: 'url',
				name: 'url',
				required: false,
				localized: true,
				type: 'Text',
			},
		],
		displayField: 'displayName',
	});

	await technology.publish();

	console.log('Database Migration completed!');
})();
