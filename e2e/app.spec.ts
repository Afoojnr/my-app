import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('dashboard shows the latest notes', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'qui est esse' })
  ).toBeVisible();
  // only the first 3 notes on the dashboard
  await expect(page.getByRole('button', { name: /^Favourite:/ })).toHaveCount(
    3
  );
});

test('notes page shows every note, and the menu marks it', async ({ page }) => {
  await page.goto('/notes');
  await expect(
    page.getByRole('heading', { name: 'Notes', level: 1 })
  ).toBeVisible();
  await expect(page.getByRole('button', { name: /^Favourite:/ })).toHaveCount(
    5
  );
  await expect(
    page
      .getByRole('navigation', { name: 'Main' })
      .getByRole('link', { name: 'Notes' })
  ).toHaveAttribute('aria-current', 'page');
});

test('login form checks the input', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByText('Enter a valid email')).toBeVisible();

  await page.getByLabel('Email').fill('afoo@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('status')).toContainText('UI only');
});

test('pages have no accessibility problems axe can find', async ({ page }) => {
  for (const path of ['/', '/notes', '/login']) {
    await page.goto(path);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, `accessibility problems on ${path}`).toEqual([]);
  }
});

test('favourites are shared between pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Favourite: qui est esse' }).click();
  await expect(
    page.getByRole('button', { name: 'Favourite: qui est esse' })
  ).toHaveAttribute('aria-pressed', 'true');

  // Navigate with the menu (no page reload), so the store keeps its state
  await page
    .getByRole('navigation', { name: 'Main' })
    .getByRole('link', { name: 'Notes' })
    .click();
  await expect(page.getByText('1 favourite')).toBeVisible();
});

test('dark mode toggle is remembered', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  const isDark = await page
    .locator('html')
    .evaluate(el => el.classList.contains('dark'));

  await page.reload();
  await expect(page.locator('html')).toHaveClass(
    isDark ? /dark/ : /^(?!.*dark)/
  );
});
