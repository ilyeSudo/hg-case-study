const fetch = require("node-fetch");

class WordFinder {
  constructor(dictionary) {
    this.dictionary = await fetch(dictionary);
  }

  longestWord(s) {
    if (s.length <= 12) {
      this.dictionary.sort((a, b) => {
        return b.length - a.length;
      });

      function hasSubString(word, str) {
        let head = 0;
        if (word.length === 0) {
          return false;
        }
        for (let i = 0; i < word.length; i += 1) {
          let index = str.indexOf(word[i], head);
          if (index < 0 || head > str.length) {
            return false;
          }
          head = index + 1;
        }
        return true;
      }

      for (let i = 0; i < this.dictionary.length; i += 1) {
        if (hasSubString(this.dictionary[i], s)) {
          return `The longest word is "${this.dictionary[i]}"`;
        }
      }
      return `There are no substrings for this Dictionary`;
    } else {
      return "Word must be at most twelve letters!";
    }
  }
}

let args = process.argv.slice(-1)[0];
let wf = new WordFinder("./assets/dictionary.txt");
let longest = wf.longestWord(args);
console.log(longest);
