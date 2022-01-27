export class Solution {
    private _wrongOnes: Set<string> = new Set<string>();
    private _rightOnes: Array<[number, string]> = [];

    constructor() {
    }

    not(letter: string) {
        if (this._rightOnes.some(t => t[1].includes(letter))) {
            return;
        }
        let value = letter.toLowerCase();
        this._wrongOnes.add(value)
    }

    get wrongOnes(): string[] {
        return Array.from(this._wrongOnes);
    }

    get rightOnes(): Array<[number, string]> {
        return this._rightOnes;
    }

    has(index: number, letter: string) {
        this._rightOnes.push([index, letter])
    }
}


