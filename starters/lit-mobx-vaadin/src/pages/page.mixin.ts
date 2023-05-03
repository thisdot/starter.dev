import { LitElement, css } from 'lit';

type Constructor<T> = new (...args: any[]) => T;

export const PageMixin = <T extends Constructor<LitElement>>(superClass: T) =>
  class extends superClass {
    static styles = [
      css`
        :host {
          --primary-color: #1e50d7;
        }

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
          border-bottom: 5px solid var(--primary-color);
        }

        a {
          --link-color: var(--primary-color);
          --link-focus-color: #1e50c3;
          --link-visited-color: #4623eb;

          color: var(--link-color);
        }

        a:visited {
          --link-color: var(--link-visited-color);
        }

        a:hover,
        a:active,
        a:focus {
          --link-color: var(--link-focus-color);
        }
      `,
    ];
  } as T;
