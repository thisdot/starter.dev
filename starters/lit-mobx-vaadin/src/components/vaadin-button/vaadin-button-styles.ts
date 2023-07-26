import '@vaadin/button/theme/lumo/vaadin-button-styles.js';

import {
	css,
	registerStyles,
} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

const button = css`
	:host([theme~='primary']) {
		background-color: var(--td-primary-color, #1d4ed8);
		color: var(--td-primary-contrast-color, #ededed);
	}
`;

registerStyles('vaadin-button', button, { moduleId: 'td-button' });
