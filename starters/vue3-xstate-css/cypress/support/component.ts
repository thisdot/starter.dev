// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { mount } from 'cypress/vue';
import './commands';
import '@/assets/main.css';

type MountParams = Parameters<typeof mount>;
type OptionsParam = MountParams[1];

declare global {
	namespace Cypress {
		interface Chainable {
			mount(component: any, options?: OptionsParam): Chainable<any>;
		}
	}
}

Cypress.Commands.add('mount', (component, options = {}) => {
	options.global = options.global || {};
	options.global.provide = options.global.provide || {};
	return mount(component, options);
});
