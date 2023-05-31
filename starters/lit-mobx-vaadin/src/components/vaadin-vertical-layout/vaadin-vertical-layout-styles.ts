import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout-styles.js';

import {
	css,
	registerStyles,
} from '@vaadin/vaadin-themable-mixin/vaadin-themable-mixin.js';

const verticalLayout = css`
	:host([theme~='center']) {
		align-items: center;
		text-align: center;
	}
`;

registerStyles('vaadin-vertical-layout', verticalLayout, {
	moduleId: 'td-vertical-layout',
});
