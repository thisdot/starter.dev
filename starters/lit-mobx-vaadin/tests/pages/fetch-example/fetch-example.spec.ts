import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8000/api-example');
});

test('be able to fetch', async ({ page }) => {
	await expect(
		page.getByText('Message: Hello, lit-mobx-vaadin starter.dev!'),
	).toBeVisible();
});
