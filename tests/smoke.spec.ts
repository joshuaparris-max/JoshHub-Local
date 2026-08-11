import { test, expect } from '@playwright/test';

const ROUTES = [
  '/',
  '/dashboard',
  '/apps',
  '/projects',
  '/projects/inventory-health',
  '/games',
  '/health',
  '/notes',
  '/platform',
  '/tasks'
];

test.describe('Smoke tests for JoshHub routes', () => {
  for (const route of ROUTES) {
    test(`Route ${route} should load successfully`, async ({ page }) => {
      const response = await page.goto(route);
      
      // Ensure page returns a 200 OK status
      expect(response?.status()).toBe(200);

      // Verify the page has actually rendered something rather than a blank screen
      // Next.js sets a specific body structure or a root div (like #__next or body itself)
      const body = await page.locator('body');
      await expect(body).toBeVisible();
    });
  }
});
