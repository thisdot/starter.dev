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
          border-bottom: 5px solid rgb(29 78 216);
        }

        a {
          color: rgb(37 99 235);
        }

        a:visited {
          color: rgb(73, 37, 235);
        }

        a:hover,
        a:active,
        a:focus {
          color: rgb(30 64 175);
        }
      `,
    ];
  } as T;
