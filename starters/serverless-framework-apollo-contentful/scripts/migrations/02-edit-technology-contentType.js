module.exports = function (migration) {
	const technology = migration.editContentType('technology');

	technology.changeFieldControl('url', 'builtin', 'slugEditor');
};
