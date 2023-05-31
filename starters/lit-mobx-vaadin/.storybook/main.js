module.exports = {
	stories: ['../**/out-tsc/stories/**/*.stories.{js,md,mdx}'],
	previewHead: async (head) => {`
		${head}
		<style>
		${(await import('../out-tsc/src/styles/theme')).theme.cssText}
		</style>
		`
	}
};
