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
    await page.goto('https://www.powerlanguage.co.uk/wordle/');
    await page.click('game-modal path');
    const letter = 's'
    const buttonSelector = `button[data-key=${letter}]`;
    await page.click(buttonSelector);

    await page.pause()
});
