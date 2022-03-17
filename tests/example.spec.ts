import {expect, test} from '@playwright/test';
import * as fs from 'fs';

class LetterResult {
    i: number;
    l: string;

    constructor(i: number, l: string) {
        this.i = i;
        this.l = l;
    }
}

function readWords() {
    const words: string[] = [];
    fs.readFileSync('words.txt', 'utf-8')
        .split(/\r?\n/)
        .forEach(function (line) {
            words.push(line)
        })
    return words;
}

test('solve today\'s wordle', async ({page}) => {
    let dictionary = readWords()
    await page.goto('https://www.powerlanguage.co.uk/wordle/');
    await page.click('id=pz-gdpr-btn-reject')
    await page.click('game-modal svg');
    let firstGuess = "crane";
    await page.keyboard.type(firstGuess);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 1800));

    let results = [];
    let wrongOnes = [];
    let present = [];

    let index = 0;
    let evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    let letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        if (results.some(lr => lr.letter == letter))
            wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 1;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    var l = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evaluation) {
        let lr = new LetterResult(index % 5, l);
        results.push(lr)
    } else if ('absent' === evaluation) {
        let lr = new LetterResult(index % 5, l);
        wrongOnes.push(lr)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, l);
        present.push(lr)
    }
    index = 2;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 3;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results = results.concat(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes = wrongOnes.concat(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present = present.concat(letterResult)
    }
    index = 4;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results = results.concat(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes = wrongOnes.concat(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present = present.concat(letterResult)
    }

    if (await page.locator('game-toast').count() > 0) {
        let solution = await page.locator('game-toast').getAttribute('text');
        expect(solution).toBe("Splendid")
        return
    }

    function matches(lr, word) {
        return lr.every(lr => word.includes(lr.l) && word.charAt(lr.i) == lr.l)
    }

    function hasWrongLetter(lr, word) {
        return !lr.some(lr => word.includes(lr.l));
    }

    function hasPresentLetter(lr: LetterResult[], word: String) {
        return lr.every(lr => word.includes(lr.l) && word.charAt(lr.i) != lr.l);
    }

    dictionary = dictionary.filter(word => matches(results, word));
    dictionary = dictionary.filter(word => hasWrongLetter(wrongOnes, word));
    dictionary = dictionary.filter(word => hasPresentLetter(present, word));

    let nextGuess = dictionary.pop();
    await page.keyboard.type(nextGuess);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 1800));

    index = 5;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    let gameTile = page.locator(`game-tile >> nth=${index}`);
    let letta = await gameTile.getAttribute("letter");
    if ('correct' === evaluation) {
        results.push(new LetterResult(index % 5, letta))
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letta);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        present.push(new LetterResult(index % 5, letta))
    }
    index = 6;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gameTile = page.locator(`game-tile >> nth=${index}`);
    letter = await gameTile.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 7;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gameTile = page.locator(`game-tile >> nth=${index}`);
    letter = await gameTile.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 8;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gameTile = page.locator(`game-tile >> nth=${index}`);
    letter = await gameTile.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 9;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gameTile = page.locator(`game-tile >> nth=${index}`);
    letter = await gameTile.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }

    if (await page.locator('game-toast').count() > 0) {
        let solution = await page.locator('game-toast').getAttribute('text');
        expect(solution).toBe("Splendid")
        return
    }

    dictionary = dictionary.filter(function (word: String) {
        return matches(results, word)
    });
    dictionary = dictionary.filter(function (word: String) {
        return hasWrongLetter(wrongOnes, word)
    });
    dictionary = dictionary.filter(function (word) {
        return hasPresentLetter(present, word);
    });

    nextGuess = dictionary.pop();
    await page.keyboard.type(nextGuess);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 1800));


    index = 10;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    let gt = page.locator(`game-tile >> nth=${index}`);
    letter = await gt.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 11;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gt = page.locator(`game-tile >> nth=${index}`);
    letter = await gt.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 12;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gt = page.locator(`game-tile >> nth=${index}`);
    letter = await gt.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 13;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gt = page.locator(`game-tile >> nth=${index}`);
    letter = await gt.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 14;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    gt = page.locator(`game-tile >> nth=${index}`);
    letter = await gt.getAttribute("letter");
    if ('correct' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evaluation) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }

    if (await page.locator('game-toast').count() > 0) {
        let solution = await page.locator('game-toast').getAttribute('text');
        expect(solution).toBe("Splendid")
        return
    }

    dictionary = dictionary.filter(w => matches(results, w));
    dictionary = dictionary.filter(w => hasWrongLetter(wrongOnes, w));
    dictionary = dictionary.filter(function (w) {
        return hasPresentLetter(present, w);
    });

    nextGuess = dictionary.pop();
    await page.keyboard.type(nextGuess);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 1800));


    index = 15;
    let evalu = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 16;
    evalu = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 17;
    evalu = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 18;
    evalu = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    if ('correct' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        results.push(letterResult)
    } else if ('absent' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        wrongOnes.push(letterResult)
    } else if ('present' === evalu) {
        let letterResult = new LetterResult(index % 5, letter);
        present.push(letterResult)
    }
    index = 19;
    evalu = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    let letterResult = new LetterResult(index % 5, letter);
    if ('correct' === evalu) {
        results.push(letterResult)
    } else if ('absent' === evalu) {
        wrongOnes.push(letterResult)
    } else if ('present' === evalu) {
        present.push(letterResult)
    }

    if (await page.locator('game-toast').count() > 0) {
        let solution = await page.locator('game-toast').getAttribute('text');
        expect(solution).toBe("Splendid")
        return
    }

    dictionary = dictionary.filter(function (wort) {
        return matches(results, wort)
    });
    dictionary = dictionary.filter(function (wort: String) {
        return hasWrongLetter(wrongOnes, wort)
    });
    dictionary = dictionary.filter(function (wort) {
        return hasPresentLetter(present, wort);
    });

    const nextGuessChars = dictionary.pop().split('');
    await page.click(`button[data-key=${nextGuessChars[0]}]`);
    await page.click(`button[data-key=${nextGuessChars[1]}]`);
    await page.click(`button[data-key=${nextGuessChars[2]}]`);
    await page.click(`button[data-key=${nextGuessChars[3]}]`);
    await page.click(`button[data-key=${nextGuessChars[4]}]`);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 1800));


    index = 20;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    let thisLetterResult = new LetterResult(index % 5, letter);
    if (evaluation === 'correct') {
        results.push(thisLetterResult)
    } else if (evaluation === 'absent') {
        wrongOnes.push(thisLetterResult)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, letter);
        present.push(lr)
    }
    index = 21;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    thisLetterResult = new LetterResult(index % 5, letter);
    if (evaluation === 'correct') {
        results.push(thisLetterResult)
    } else if (evaluation === 'absent') {
        wrongOnes.push(thisLetterResult)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, letter);
        present.push(lr)
    }
    index = 22;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    thisLetterResult = new LetterResult(index % 5, letter);
    if (evaluation === 'correct') {
        results.push(thisLetterResult)
    } else if (evaluation === 'absent') {
        wrongOnes.push(thisLetterResult)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, letter);
        present.push(lr)
    }
    index = 23;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    thisLetterResult = new LetterResult(index % 5, letter);
    if (evaluation === 'correct') {
        results.push(thisLetterResult)
    } else if (evaluation === 'absent') {
        wrongOnes.push(thisLetterResult)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, letter);
        present.push(lr)
    }
    index = 24;
    evaluation = await page.locator(`game-tile >> nth=${index}`).getAttribute("evaluation");
    letter = await page.locator(`game-tile >> nth=${index}`).getAttribute("letter");
    thisLetterResult = new LetterResult(index % 5, letter);
    if (evaluation === 'correct') {
        results.push(thisLetterResult)
    } else if (evaluation === 'absent') {
        wrongOnes.push(thisLetterResult)
    } else if ('present' === evaluation) {
        let lr = new LetterResult(index % 5, letter);
        present.push(lr)
    }

    dictionary = dictionary.filter(w => matches(results, w));
    dictionary = dictionary.filter(w => hasWrongLetter(wrongOnes, w));
    dictionary = dictionary.filter(w => hasPresentLetter(present, w));

    let lastGuess = dictionary.pop().split('');
    await page.click(`button[data-key=${lastGuess[0]}]`);
    await page.click(`button[data-key=${lastGuess[1]}]`);
    await page.click(`button[data-key=${lastGuess[2]}]`);
    await page.click(`button[data-key=${lastGuess[3]}]`);
    await page.click(`button[data-key=${lastGuess[4]}]`);
    await page.keyboard.press('Enter');
    await new Promise(f => setTimeout(f, 2000));

    if (await page.locator('game-toast').count() > 0) {
        let solution = await page.locator('game-toast').getAttribute('text');
        expect(solution).toBe("Splendid")
        return
    }
});
