import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
	await page.goto('http://localhost:8000/counter');
});

test('be able to increment', async ({ page }) => {
	await page.getByRole('button', { name: 'Increment' }).click();

	await expect(page.getByText('Count: 1')).toBeVisible();
});

test('be able to decrement', async ({ page }) => {
	await page.getByRole('button', { name: 'Decrement' }).click();

	await expect(page.getByText('Count: -1')).toBeVisible();
});

test('be able to reset', async ({ page }) => {
	await page.getByRole('button', { name: 'Increment' }).click();
	await page.getByRole('button', { name: 'Increment' }).click();

	await expect(page.getByText('Count: 2')).toBeVisible();

	await page.getByRole('button', { name: 'Reset' }).click();

	await expect(page.getByText('Count: 0')).toBeVisible();
});
