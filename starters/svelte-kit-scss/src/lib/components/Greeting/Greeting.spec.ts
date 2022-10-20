import Greeting from './Greeting.svelte';

describe('Greeting Component', () => {
	test('should render the component', () => {
		// Create a new container for the test
		const host = document.createElement('div');

		// Append the new container in the HTML body
		document.body.appendChild(host);

		// Create an instance of the vertical tab
		const instance = new Greeting({ target: host });

		// Check if the instance created
		expect(instance).toBeTruthy();
	});
});
