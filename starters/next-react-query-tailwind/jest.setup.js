// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { cleanUpMocks } from './__mocks__/consoleMock';
import "whatwg-fetch";

afterAll(() => {
  cleanUpMocks();
});
