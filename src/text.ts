import { Text } from "havarot";
import { Word } from "havarot/dist/word";
import { Syllable } from "havarot/dist/syllable";
import { syllableRules } from "./rules";

// AUGMENT CLASSES
declare module "havarot/dist/syllable" {
  interface Syllable {
    transliterate(): string;
  }
}

Syllable.prototype.transliterate = function (): string {
  let transliteration = this.text;
  transliteration = syllableRules(this);
  return transliteration;
};

declare module "havarot/dist/word" {
  interface Word {
    transliterate(): string;
  }
}

Word.prototype.transliterate = function (): string {
  const transliteratedArr = this.syllables.map((syl) => syl.transliterate());
  const transliteration = transliteratedArr.reduce((a, c) => a + c, "");
  return transliteration;
};

declare module "havarot/dist/text" {
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
