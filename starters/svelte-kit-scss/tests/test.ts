import { expect, test } from '@playwright/test';

test('counter page has expected h1', async ({ page }) => {
  await page.goto('/counter');
  expect(await page.textContent('h1')).toBe('Increment, Decrement and Reset Button Example');
});
