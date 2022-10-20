import Greeting from './Greeting.svelte';

export default {
	title: 'Example/Greeting',
	component: Greeting,
	parameters: {
		// More on Story layout: https://storybook.js.org/docs/svelte/configure/story-layout
		layout: 'fullscreen'
	}
};

const Template = () => ({
	Component: Greeting
});

// More on args: https://storybook.js.org/docs/svelte/writing-stories/args
export const Default = Template.bind({});
