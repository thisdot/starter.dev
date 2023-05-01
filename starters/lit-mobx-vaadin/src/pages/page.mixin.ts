import { LitElement, css } from 'lit';

type Constructor<T> = new (...args: any[]) => T;

export const PageMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class PageMixin extends superClass {
    static styles = [
      css`
        ul {
            list-style: none;
        }
        
        h1 {
            border-bottom: 5px solid var(--td-primary-color, var(--td-text-color, #1d4ed8));
        }
      `
    ]
  }
  return PageMixin as T;
}
