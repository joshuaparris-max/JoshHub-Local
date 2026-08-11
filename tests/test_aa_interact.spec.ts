import { test, expect } from '@playwright/test';

test('Test AA Game Interaction', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err));

  await page.goto('http://localhost:3000/games/aa-game-adventure/index.html');
  await page.waitForTimeout(1000);
  
  console.log("Pressing E...");
  await page.keyboard.press('e');
  await page.waitForTimeout(500);
  await page.keyboard.press('E');
  await page.waitForTimeout(500);

  const text = await page.evaluate(() => document.body.innerText);
  console.log("SCREEN TEXT AFTER E:", text);
});
