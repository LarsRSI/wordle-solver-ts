import { test, expect } from '@playwright/test';
import {Dictionary} from './dictionary';
import {Solution} from './solution';

test('next word from dictionary when everything possible', async ({ page }) => {
    let dictionary = new Dictionary(["abc", "bcd", "def"]);
    let solution = new Solution();

    let result = dictionary.nextGuess(solution);
    expect(result).toBe('def')
});

test('next word from dictionary when 1 letter not possible', async ({ page }) => {
    let dictionary = new Dictionary(["abc", "bcd", "cde", "def"]);
    let solution = new Solution();
    solution.not('d');

    let result = dictionary.nextGuess(solution);
    expect(result).toBe('abc')
});

test('next word from dictionary when multiple letters not possible', async ({ page }) => {
    let dictionary = new Dictionary(["abc", "bcd", "cde", "def"]);
    let solution = new Solution();
    solution.not('f');
    solution.not('a');

    let result = dictionary.nextGuess(solution);
    expect(result).toBe('cde')
});