module.exports = function (migration) {
	const technology = migration.createContentType('technology', {
		name: 'Technology',
		displayField: 'displayName',
		description: 'Technology content type',
	});

	technology
		.createField('displayName')
		.name('Display Name')
		.required(true)
		.localized(true)
		.type('Symbol');

	technology
		.createField('description')
		.name('Description')
		.required(false)
		.localized(true)
		.type('Symbol');

	technology
		.createField('url')
		.name('URL')
		.required(false)
		.localized(true)
		.validations([{ unique: true }])
		.type('Symbol');
};
