import {Solution} from './solution';

export class Dictionary {
    words: string[];

    constructor(words: string[]) {
        this.words = words;
    }

    nextGuess(solution: Solution): string {
        if (solution.wrongOnes.length == 0) {
            return this.words.pop();
        }

        const onlyContainsLettersThatAreNotRuledOutYet = word => !solution.wrongOnes.some(element => word.includes(element));

        const potentialWords = this.words.filter(onlyContainsLettersThatAreNotRuledOutYet);
        let s = potentialWords.pop();
        this.words = potentialWords
        return s;
    }
}


