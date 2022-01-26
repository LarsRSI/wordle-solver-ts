import {Page, test} from '@playwright/test';
import * as fs from 'fs';
import {Dictionary} from './dictionary';
import {Solution} from './solution';

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

    const toast = page.locator("#game-toaster");
    let solution = new Solution();

    while (!await toast.isVisible()) {
        const word = dictionary.nextGuess(solution);
        console.log("guessing " + word);
        await guess(page, word);

        const gameTile = await page.locator('game-tile >> nth=0');
        const result = await gameTile.getAttribute('evaluation');
        if (result === 'absent') {
            let letter = await gameTile.getAttribute('letter');
            solution.not(letter);
        } else if (result === 'present') {

        } else {

        }
    }

    await page.pause()
});
