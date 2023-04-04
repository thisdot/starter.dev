/**
 * Choosing to export testing library through a utility file instead to avoid major refactorings and allowing custom configuration.
 * Please see: https://testing-library.com/docs/react-testing-library/setup as reference
 */
import userEvent from '@testing-library/user-event';
export * from '@testing-library/vue';

export { userEvent };
