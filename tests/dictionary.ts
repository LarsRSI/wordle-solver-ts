import {Solution} from './solution';

export class Dictionary {
    words: string[];

    constructor(words: string[]) {
        this.words = words;
    }

    nextGuess(solution: Solution): string {

        const onlyContainsLettersThatAreNotRuledOutYet = word => !solution.wrongOnes.some(element => word.includes(element));

        const potentialWords = this.words.filter(onlyContainsLettersThatAreNotRuledOutYet).filter(word => {
            for (let letter of solution.rightOnes) {
                if (!(word.charAt(letter[0] - 1) == letter[1])) {
                    return false;
                }
            }
            return true
        });
        let result = potentialWords.pop();
        this.words = potentialWords
        return result;
    }
}


