import { test, expect } from '@playwright/test';

test('Test AA Game', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  await page.goto('http://localhost:3000/games/aa-game-adventure/index.html');
  await page.waitForTimeout(2000);
  
  const text = await page.evaluate(() => document.body.innerText);
  console.log("SCREEN TEXT:", text);
});
