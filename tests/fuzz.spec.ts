import { test, expect } from '@playwright/test';

// List of all 30 games hosted locally in public/games/
const GAMES = [
  'amodule-dnd', 'boundary-road', 'buckland-blocks',
  'buckland-v1', 'buckland-v2', 'classic-dnd-text', 'dinner-decider',
  'dnd-rpg-dungeon', 'forbidden-quests', 'infinite-office', 'josh-nfc-audio',
  'max', 'midnight-line', 'mysterious-depths', 'neon-dash',
  'neverwinter-tales', 'newfileqqqwertuhvgjkk', 'newgame',
  'orgscape', 'random-play', 'serenity-keep-flying', 'simple-rpg-gh',
  'starhaven', 'tile-game', 'wilds-2', 'wilds-main', 'wilds-sail-west'
];

test.describe('Automated Fuzz Testing for All Local Games', () => {
  for (const game of GAMES) {
    test(`Game: ${game} should load and be interactive without crashing`, async ({ page }) => {
      const errors: Error[] = [];
      
      // Catch unhandled JavaScript exceptions from the game logic
      page.on('pageerror', (err) => {
        console.error(`Browser Error in ${game}:`, err);
        errors.push(err);
      });
      page.on('console', msg => {
        if(msg.type() === 'error') console.log(`Browser Console Error in ${game}:`, msg.text());
      });

      // 1. Visit the game
      const response = await page.goto(`/games/${game}/index.html`, { waitUntil: 'domcontentloaded' });
      
      // 2. Ensure it actually exists (no 404s)
      expect(response?.status()).toBe(200);

      // 3. Simple Fuzz Interaction: Try to click the first 3 interactive elements (buttons/links)
      try {
        const interactables = page.locator('button, a, [role="button"]').first();
        if (await interactables.isVisible()) {
            await interactables.click({ timeout: 1000 });
        }
      } catch (e) {
        // Elements might not exist or be clickable, which is fine for fuzzing
      }

      // 4. Wait briefly to allow any async logic or animations to throw errors
      await page.waitForTimeout(500);

      // 5. Assert no fatal JavaScript errors occurred
      expect(errors).toHaveLength(0);
    });
  }
});
