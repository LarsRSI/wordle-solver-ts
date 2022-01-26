export class Solution {
    private _wrongOnes: Set<string> = new Set<string>();

    constructor() {
    }

    not(letter: string) {
        let value = letter.toLowerCase();
        this._wrongOnes.add(value)
    }

    get wrongOnes(): string[] {
        return Array.from(this._wrongOnes);
    }
}


