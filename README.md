# Wordle Solver with playwright

## Getting started

### NodeJS

You'll need npm and nodejs, visit [nodejs.org](https://nodejs.org/en/) for instructions.

### TypeScript

You'll need TypeScript, visit [typescriptlang.org](https://www.typescriptlang.org/download) for instructions.

### then

run `npm install` from the command line to install playwright.

and then run `npx playwright install` so that playwright can prepare the browser binaries.

Now you can run several commands:

`npx playwright test`

Runs the end-to-end tests.

`npx playwright test --project=chromium`

Runs the tests only on Desktop Chrome.

`npx playwright test tests/example.spec.ts`

Runs the tests of a specific file.

`npx playwright test --debug`

Runs the tests in debug mode.

## What is this about again?

Definitely not about writing the best automated solver for wordle!
There are many opportunities for you to try something else that interests you. Maybe half-way through implementing the
solver, you noticed that playwright can create a recording of what it is doing. 
* Try it out and create videos. 
* Or look into taking snapshots for visual comparisons. 
* Find x different ways on how to locate and select a specific element on the
page. 
* Configure tests to run with chrome, firefox and safari. 
* Run your tests/solver in headless mode. 
* Try to use the [Page Object Model](https://playwright.dev/docs/test-pom) pattern.
* Become more familiar with TypeScript, async&await and all that...
* The sky is the limit :)

## The official problem

Automate solving wordle each day. Subtasks include:

* Open the page and get it in a state so that we can make a guess;
* Get a list of words, select a word we want to try next; (or just hard-code your 6 favourite 5 letter words?)
* Type that word in the UI;
* Read the result from the webpage, hopefully win?!

## Help

[This page](https://playwright.dev/docs/selectors) from the playwright documentation will be very useful. With
the [Browser Developer Tools](https://playwright.dev/java/docs/debug#browser-developer-tools) you can figure out how
your selectors should look like.

Just in case some code snippets that I had to google when I built my solution in TypeScript.

### How to read a file line by line

<details>
  <summary>Click to expand!</summary>

```jsx
import * as fs from 'fs';

function readFile() {
    fs.readFileSync('words.txt', 'utf-8')
        .split(/\r?\n/)
        .forEach(function (line) {
            // do something here
        })
}
```

</details>

### How to read a file line by line and store it in an array

also, check out
the [array documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

<details>
  <summary>Click to expand!</summary>

```jsx
import * as fs from 'fs';

function readWords() {
    const words: string[] = [];
    fs.readFileSync('words.txt', 'utf-8')
        .split(/\r?\n/)
        .forEach(function (line) {
            words.push(line)
        })
    return words;
}
```

</details>

### String interpolation / Template literals (Template strings)

Template literals are literals delimited with backticks (`), allowing embedded expressions called substitutions.

<details>
  <summary>Click to expand!</summary>

```jsx
const letter = 's'
const buttonSelector = `button[data-key=${letter}]`;
```

</details>

### Split a string and do something for each letter

<details>
  <summary>Click to expand!</summary>

```jsx
const anyString = 'hello'
const letters = anyString.split('')

for (const letter of letters) {
    console.log(letter + '\n');
}
```

</details>

### How to wait/sleep for a moment

<details>
  <summary>Click to expand!</summary>

```jsx
await new Promise(f => setTimeout(f, 1800));
```

</details>

### a naive dictionary class (wrapper around words-array)

My very first implementation to get the code out from the test case. This is optional, no need to use it or follow this
approach.

<details>
  <summary>Click to expand!</summary>

```jsx
// file: dictionary.ts
export class Dictionary {
    words: string[];

    constructor(words: string[]) {
        this.words = words;
    }

    nextGuess(): string {
        return this.words.pop();
    }
}
```

```jsx
// file: example.spec.ts
import {Dictionary} from './dictionary';

const dictionary = new Dictionary(words);

const word = dictionary.nextGuess();
```

</details>


# Good luck and have fun!
