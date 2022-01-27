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

test('will not rule out words with f if f was among correct ones but then wrong for other position', async ({ page }) => {
    let dictionary = new Dictionary(["abc", "bcd", "efg", "cde", "def"]);
    let solution = new Solution();
    solution.not('a');
    solution.not('b');
    solution.has(2, 'f')
    solution.not('f');

    let result = dictionary.nextGuess(solution);
    expect(result).toBe('efg')
});

test('will only return words that have correct letter at same location', async ({ page }) => {
    let dictionary = new Dictionary(["abc", "bcd", "cde", "def", "efg", "dot"]);
    let solution = new Solution();
    solution.has(2, 'd')

    let result = dictionary.nextGuess(solution);
    expect(result).toBe('cde')
});