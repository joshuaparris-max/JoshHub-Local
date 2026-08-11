import { test, expect } from '@playwright/test';

test.describe('App Inventory Interaction', () => {
  test('Should search for an app and verify it appears', async ({ page }) => {
    await page.goto('/apps');
    
    // The Apps page should have a search input
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();

    // Type a known app, e.g., 'JoshHub' or 'Wilds'
    await searchInput.fill('JoshHub');
    
    // There should be a link/text for 'JoshHub' rendered in the results
    await expect(page.getByText('JoshHub', { exact: false }).first()).toBeVisible();
  });
});
