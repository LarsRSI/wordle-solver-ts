import { test, expect } from '@playwright/test';

test('verify loss at end of playing', async ({ page }) => {
  await page.goto('https://www.powerlanguage.co.uk/wordle/');
  await page.click('id=pz-gdpr-btn-reject')
  await page.pause();
});
