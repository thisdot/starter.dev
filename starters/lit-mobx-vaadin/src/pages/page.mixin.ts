import { LitElement, css } from 'lit';

type Constructor<T> = new (...args: any[]) => T;

export const PageMixin = <T extends Constructor<LitElement>>(superClass: T) =>
	class extends superClass {
		static styles = [
			css`
				ul {
					padding: 0;
					list-style: none;
				}

				li {
					margin: 10px 0;
					font-size: 1.2rem;
					text-align: center;
				}

				h1 {
					padding: 15px;
					font-size: 2rem;
					font-weight: 700;
					text-align: center;
					border-bottom: 5px solid var(--td-primary-color);
				}

				a {
					color: var(--td-link-color);
				}

				a:visited {
					--td-link-color: var(--td-link-visited-color);
				}

				a:hover,
				a:active,
				a:focus {
					--td-link-color: var(--td-link-focus-color);
				}
			`,
		];
	} as T;
