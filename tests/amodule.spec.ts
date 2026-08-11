import { test, expect } from '@playwright/test';

test('Play A Module DnD', async ({ page }) => {
  await page.goto('http://localhost:3000/games/amodule-dnd/index.html');
  console.log("Waiting for game to load...");
  await page.waitForTimeout(1000);
  
  const newGameBtn = page.locator('#btn-new-game');
  if (await newGameBtn.isVisible()) {
    console.log("Clicking New Game...");
    await newGameBtn.click();
  }
  
  await page.waitForTimeout(500);
  
  const getScreenText = async () => {
    return await page.evaluate(() => {
      let text = '';
      document.querySelectorAll('div').forEach(n => {
         // Get text of elements that have specific classes like dialog or modal
         if (n.className && typeof n.className === 'string' && (n.className.includes('dialog') || n.className.includes('modal'))) {
            text += n.innerText + '\n';
         }
      });
      return text.trim() === '' ? 'No active dialogs or modals' : text;
    });
  };

  console.log("Initial state text:", await getScreenText());

  console.log("Pressing Space...");
  await page.keyboard.press(' ');
  await page.waitForTimeout(500);
  console.log("State after space:", await getScreenText());
  await page.keyboard.press(' '); // dismiss dialog if any

  // move around
  console.log("Moving around...");
  for(let i=0; i<3; i++) {
    await page.keyboard.press('d');
    await page.waitForTimeout(200);
  }
  for(let i=0; i<3; i++) {
    await page.keyboard.press('s');
    await page.waitForTimeout(200);
  }
  
  await page.keyboard.press(' ');
  await page.waitForTimeout(500);
  console.log("State after moving and space:", await getScreenText());
  
  await page.keyboard.press('e');
  await page.waitForTimeout(500);
  console.log("State after inventory 'e':", await getScreenText());
});
