// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'isomorphic-unfetch';
import { cleanUpMocks } from './__mocks__/consoleMock';

afterAll(() => {
  cleanUpMocks();
});
