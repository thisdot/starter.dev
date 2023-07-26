import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8000/');
});

test('has title', async ({ page }) => {
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle('Lit-Mobx-Vaadin starter.dev');

	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'Lit-Mobx-Vaadin Starter Kit',
	);
});

test('has page links', async ({ page }) => {
	await expect(
		page.getByRole('link', { name: 'See Counter example component' }),
	).toHaveAttribute('href', '/counter');

	await expect(
		page.getByRole('link', { name: 'See Fetch example component' }),
	).toHaveAttribute('href', '/greet');
});
