import {expect, Page, test} from '@playwright/test';
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
    page.keyboard.type(word);
    await page.click('text=enter');
    await new Promise(f => setTimeout(f, 1800));
}

async function gameOver(page: Page) {
    const toast = page.locator("#game-toaster");
    return await toast.isVisible();
}

function adjustRow(row: number) {
    let rowAdjustment = 0;
    switch (row) {
        case 1:
            rowAdjustment = 0;
            break;
        case 2:
            rowAdjustment = 5;
            break;
        case 3:
            rowAdjustment = 10;
            break;
        case 4:
            rowAdjustment = 15;
            break;
        case 5:
            rowAdjustment = 20;
            break;
        case 6:
            rowAdjustment = 25;
            break;
    }
    return rowAdjustment;
}

async function evaluate(page: Page, row: number, index: number, solution: Solution) {
    const gameTileIndex = index - 1;
    const rowAdjustment = adjustRow(row);
    const gameTile = await page.locator('game-tile >> nth=' + (gameTileIndex + rowAdjustment));
    const result = await gameTile.getAttribute('evaluation');
    let letter = await gameTile.getAttribute('letter');
    switch (result) {
        case 'absent':
            solution.not(letter);
            break;
        case 'present':
            solution.almost(index, letter);
            break;
        case 'correct':
            solution.has(index, letter)
            break;
    }
}

async function findCurrentWinStreak(page: Page) {
    let locator = page.locator('.statistic-container >> nth=2');
    let currentStreak = (await locator.innerText()).split('\n')[0];
    return Number(currentStreak);
}

test('solve wordle of the day', async ({page}) => {
    await page.goto('https://www.powerlanguage.co.uk/wordle/');
    await page.click('game-modal path');

    let solution = new Solution();
    let row = 1;
    while (!await gameOver(page)) {
        const word = dictionary.nextGuess(solution);

        await guess(page, word);
        for (const i of [1, 2, 3, 4, 5]) {
            await evaluate(page, row, i, solution);
        }
        row++;
    }
    await new Promise(f => setTimeout(f, 3000));
    const result = await findCurrentWinStreak(page);

    expect(result).toBe(1);
});
