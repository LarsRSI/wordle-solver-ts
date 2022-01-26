import {Page, test} from '@playwright/test';
import * as fs from 'fs';
import {Dictionary} from './dictionary';

function readWords() {
    const words: string[] = [];
    fs.readFileSync('words.txt', 'utf-8').split(/\r?\n/).forEach(function (line) {
        words.push(line)
    })
    return words;
}

const words = readWords();

let dictionary = new Dictionary(words);

async function guess(page: Page, word: string) {
    const letters = word.split('')
    for (const letter of letters) {
        const buttonSelector = `button[data-key=${letter}]`;
        await page.click(buttonSelector);
    }
    await page.click('text=enter');
    await new Promise(f => setTimeout(f, 1800));
}

test('basic test', async ({page}) => {
    await page.goto('https://www.powerlanguage.co.uk/wordle/');
    await page.click('game-modal path');

    let toast = page.locator("#game-toaster");

    while (!await toast.isVisible()) {
        let word = dictionary.nextGuess();
        await guess(page, word);
    }

    await page.pause()
});
