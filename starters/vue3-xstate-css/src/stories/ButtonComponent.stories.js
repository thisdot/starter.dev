import ButtonComponent from '../components/ButtonComponent.vue';

export default {
	title: 'Components/Button',
	component: ButtonComponent,
	argTypes: {
		default: {
			control: 'text',
			description: 'Slot content',
			defaultValue: 'Example',
		},
	},
};

export const Default = (args) => ({
	components: { ButtonComponent },
	setup: () => ({ args }),
	template: '<ButtonComponent>{{ args.default }}</ButtonComponent>',
});
