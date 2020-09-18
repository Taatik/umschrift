import { Text } from "havarotjs";
import { Word } from "havarotjs/dist/word";
import { Syllable } from "havarotjs/dist/syllable";
import { syllableRules, wordRules } from "./rules";

// AUGMENT CLASSES
declare module "havarotjs/dist/syllable" {
  interface Syllable {
    transliterate(): string;
  }
}

Syllable.prototype.transliterate = function (): string {
  let transliteration = this.text;
  transliteration = syllableRules(this);
  return transliteration;
};

declare module "havarotjs/dist/word" {
  interface Word {
    transliterate(): string;
  }
}

Word.prototype.transliterate = function (): string {
  const transliteratedArr = this.syllables.map((syl) => syl.transliterate());
  const transliteratedWord = transliteratedArr.reduce((a, c) => a + c, "");
  const transliteration = wordRules(transliteratedWord);
  return transliteration;
};

declare module "havarotjs/dist/text" {
  interface Text {
    transliterate(): string;
  }
}

Text.prototype.transliterate = function (): string {
  const transliteratedArr = this.words.map((word) => word.transliterate());
  const transliteration = transliteratedArr
    .reduce((a, c) => `${a}${c} `, "")
    .trim();
  return transliteration;
};

export { Text };
