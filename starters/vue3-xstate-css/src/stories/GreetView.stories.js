import GreetView from '../views/GreetView.vue';

export default {
	title: 'Pages/Greet',
	component: GreetView,
	parameters: {
		layout: 'fullscreen',
	},
};

const Template = (args) => ({
	components: { GreetView },
	setup() {
		return { args };
	},
	template: '<GreetView v-bind="args"/>',
});

export const Default = Template.bind({});
