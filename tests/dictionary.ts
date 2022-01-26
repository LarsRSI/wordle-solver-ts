export class Dictionary {
    words: string[];

    constructor(words: string[]) {
        this.words = words;
    }

    nextGuess(): string {
        return this.words.pop();
    }
}


