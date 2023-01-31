import { getEnvironment } from '../src/utils/contentful';

(async () => {
	console.log('Migrating database...');

	const environment = await getEnvironment();

	const technology = await environment.createContentTypeWithId('technology', {
		name: 'Technology',
		fields: [
			{
				id: 'displayName',
				name: 'Display Name',
				required: true,
				localized: false,
				type: 'Text',
			},
			{
				id: 'description',
				name: 'Description',
				required: false,
				localized: false,
				type: 'Text',
			},
			{
				id: 'url',
				name: 'url',
				required: false,
				localized: false,
				type: 'Text',
			},
		],
	});

	await technology.publish();

	console.log('Database Migration completed!');
})();
