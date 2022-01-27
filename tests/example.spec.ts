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

async function gameOver(page: Page) {
    const toast = page.locator("#game-toaster");
    return await toast.isVisible();
}

async function evaluate(page: Page, index: string, solution: Solution) {
    const gameTile = await page.locator('game-tile >> nth=' + index);
    const result = await gameTile.getAttribute('evaluation');
    if (result === 'absent') {
        let letter = await gameTile.getAttribute('letter');
        solution.not(letter);
    } else if (result === 'present') {

    } else {

    }
}

test('solve wordle of the day', async ({page}) => {
    await page.goto('https://www.powerlanguage.co.uk/wordle/');
    await page.click('game-modal path');

    let solution = new Solution();
    while (!await gameOver(page)) {
        const word = dictionary.nextGuess(solution);
        await guess(page, word);

        await evaluate(page, '0', solution);
        await evaluate(page, '1', solution);
        await evaluate(page, '2', solution);
        await evaluate(page, '3', solution);
        await evaluate(page, '4', solution);
    }

    await page.pause()
});
