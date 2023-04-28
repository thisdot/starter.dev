import { expect, test } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:8000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Lit-Mobx-Vaadin starter\.dev/);
});
