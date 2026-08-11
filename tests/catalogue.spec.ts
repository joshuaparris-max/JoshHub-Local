import { test, expect } from '@playwright/test';
import { apps } from '../src/data/apps';

test.describe('Automated Fuzz Testing for Full App Catalogue', () => {
  for (const app of apps) {
    if (!app.primaryUrl) {
      continue;
    }

    test(`Catalogue: ${app.id} (${app.name}) should resolve`, async ({ page }) => {
      // Setup error trapping
      const errors: Error[] = [];
      page.on('pageerror', (err) => {
        console.error(`Browser Error in ${app.name}:`, err);
        errors.push(err);
      });
      page.on('console', msg => {
        if(msg.type() === 'error') console.log(`Browser Console Error in ${app.name}:`, msg.text());
      });

      const isExternal = app.primaryUrl.startsWith('http');
      const isGoogleDrive = app.primaryUrl.includes('drive.google.com') || app.primaryUrl.includes('docs.google.com');
      const isItch = app.primaryUrl.includes('itch.io');
      const isStaticDoc = app.primaryUrl.startsWith('/docs/');
      const isLocalWebGame = app.primaryUrl.startsWith('/games/');
      
      // If it's a known strict 3rd party site (Drive/Itch), they often block automated browsers 
      // or show CAPTCHAs. We'll attempt a navigation but allow 403s or non-200s as a pass, 
      // primarily ensuring it doesn't immediately crash.
      const response = await page.goto(app.primaryUrl, { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(e => null);
      
      if (!response) {
          // Navigation timed out or failed entirely
          if (isGoogleDrive || isItch) {
              console.log(`Skipping strict external domain resolution for ${app.name}`);
              return;
          }
          throw new Error(`Failed to navigate to ${app.primaryUrl}`);
      }

      if (!isGoogleDrive && !isItch) {
          // We expect a valid HTTP status for our own apps/docs
          expect(response.status()).toBeLessThan(400); 
      }

      // If it is an interactive web app (local game, vercel app, github pages), try to click something
      if (isLocalWebGame || app.primaryUrl.includes('vercel.app') || app.primaryUrl.includes('github.io')) {
          try {
            const interactables = page.locator('button, a, [role="button"]').first();
            if (await interactables.isVisible({ timeout: 1000 })) {
                await interactables.click({ timeout: 1000 });
            }
          } catch (e) {
            // Elements might not exist or be clickable
          }
          
          await page.waitForTimeout(500);
          expect(errors).toHaveLength(0);
      }
    });
  }
});
