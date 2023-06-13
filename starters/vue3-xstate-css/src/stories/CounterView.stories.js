import CounterView from '../views/CounterView.vue';

export default {
	title: 'Pages/Counter',
	component: CounterView,
	parameters: {
		layout: 'fullscreen',
	},
};

export const Default = (args) => ({
	components: { CounterView },
	setup: () => ({ args }),
	template: '<CounterView />',
});
