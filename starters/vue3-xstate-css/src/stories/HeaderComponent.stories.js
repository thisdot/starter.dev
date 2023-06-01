import HeaderComponent from '../components/HeaderComponent.vue';

export default {
	title: 'Components/Header',
	component: HeaderComponent,
	argTypes: {
		default: {
			control: 'text',
			description: 'Slot content',
			defaultValue: 'Sample Heading Text',
		},
	},
};

export const Default = (args) => ({
	components: { HeaderComponent },
	setup: () => ({ args }),
	template: '<HeaderComponent>{{ args.default }}</HeaderComponent>',
});
