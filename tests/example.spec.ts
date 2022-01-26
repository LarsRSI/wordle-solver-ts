import {test, expect} from '@playwright/test';
import * as fs from 'fs';

function readWords() {
    const words: string[] = [];
    fs.readFileSync('words.txt', 'utf-8').split(/\r?\n/).forEach(function (line) {
        words.push(line)
    })
    return words;
}

const words = readWords();


test('basic test', async ({page}) => {
    await page.goto('https://playwright.dev/');
    await page.locator('text=Get started').click();

    await page.pause()
    await expect(page).toHaveTitle(/Getting started/);
});
