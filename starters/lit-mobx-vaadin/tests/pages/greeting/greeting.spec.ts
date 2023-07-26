import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8000/greet');
});

test('be able to fetch', async ({ page }) => {
	await expect(
		page.getByText('Message: Hello, lit-mobx-vaadin starter.dev!'),
	).toBeVisible();
});

test('accepts query param to customize message', async ({ page }) => {
	await page.goto('http://localhost:8000/greet?greeting=custom%20greeting');
	await expect(page.getByText('Message: Hello, custom greeting')).toBeVisible();
});
