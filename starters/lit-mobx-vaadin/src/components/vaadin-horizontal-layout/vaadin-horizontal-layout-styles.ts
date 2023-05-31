import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout-styles.js';

import {
	css,
	registerStyles,
} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

const horizontalLayout = css`
	:host([theme~='center']) {
		align-items: center;
		text-align: center;
	}
	:host([theme~='wrap']) {
		flex-wrap: wrap;
	}
`;

registerStyles('vaadin-horizontal-layout', horizontalLayout, {
	moduleId: 'td-horizontal-layout',
});
