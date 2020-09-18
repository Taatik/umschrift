import { Syllable } from "havarotjs/dist/syllable";
import { transliterateMap } from "./hebCharTrans";

const changeElementSplit = (input: string, split: RegExp, join: string) =>
  input.split(split).join(join);

export const syllableRules = (syl: Syllable): string => {
  let txt: string = syl.text;
  const taamei = /[\u{0590}-\u{05AF},\u{05BD},\u{05BF},\u{05C0},\u{05C3}]/u;
  txt = txt.replace(taamei, "");

  /******************
   * SPIRANTIZATION
   ******************/
  // bet with dagesh > b
  if (/ב\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /ב\u{05BC}/u, "b");
  }

  // gimel with dagesh > g
  if (/ג\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /ג\u{05BC}/u, "g");
  }

  // dalet with dagesh > d
  if (/ד\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /ד\u{05BC}/u, "d");
  }

  // kaph with dagesh > k
  if (/כ\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /כ\u{05BC}/u, "k");
  }

  // final kaph with dagesh > k
  if (/ך\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /ך\u{05BC}/u, "k");
  }

  // peh with dagesh > p
  if (/פ\u{05BC}/u.test(txt)) {
    txt = changeElementSplit(txt, /פ\u{05BC}/u, "p");
  }

  /*******************
   * YOD ORTHOGRAPHY
   *******************/
  const hiriqYodExp = /\u{05B4}\u{05D9}/u;
  if (hiriqYodExp.test(txt)) {
    txt = changeElementSplit(txt, hiriqYodExp, "i");
  }

  const tsereYodExp = /\u{05B5}\u{05D9}/u;
  if (tsereYodExp.test(txt)) {
    txt = changeElementSplit(txt, tsereYodExp, "e");
  }

  /*******************
   * VAV ORTHOGRAPHY
   *******************/
  // holem precedes waw
  const holemVavExp = /\u{05B9}\u{05D5}/u;
  if (holemVavExp.test(txt)) {
    txt = changeElementSplit(txt, holemVavExp, "o");
  }

  const shureqExp = /\u{05D5}\u{05BC}(?![\u{05B0}-\u{05BB},\u{05C7}])/u;
  if (shureqExp.test(txt)) {
    txt = changeElementSplit(txt, shureqExp, "u");
  }

  /*********************
   * SHEWA ORTHOGRAPHY
   *********************/
  const shewa = /\u{05B0}/u;
  if (shewa.test(txt) && syl.isClosed) {
    txt = changeElementSplit(txt, shewa, "");
  }

  /***********
   * CLEANUP
   ***********/
  // furtive patch
  if (syl.isFinal) {
    const furtiveChet = /\u{05D7}\u{05B7}$/mu;
    // const furtiveAyin = /\u{05E2}\u{05B7}$/mu;
    const furtiveHe = /\u{05D4}\u{05BC}\u{05B7}$/mu;

    if (furtiveChet.test(txt)) {
      txt = changeElementSplit(txt, furtiveChet, "\u{05B7}\u{05D7}");
    }
    // else if (furtiveAyin.test(txt)) {
    //   txt = changeElementSplit(txt, furtiveChet, "\u{05B7}\u{05E2}");
    else if (furtiveHe.test(txt)) {
      txt = changeElementSplit(txt, furtiveHe, "\u{05B7}");
      // txt = txt.replace("\u{05D4}", "");
    }
  }

  // shin > sch
  if (/ש\u{05C1}/u.test(txt)) {
    txt = changeElementSplit(txt, /ש\u{05C1}/u, "sch");
  }

  // 3ms suffix
  const threeMSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
  if (threeMSSuffix.test(txt) && syl.isFinal) {
    txt = changeElementSplit(txt, threeMSSuffix, "aw");
  }

  // qamets he
  const qametsHe = /\u{05B8}\u{05D4}(?!\u{05BC})/u;
  if (qametsHe.test(txt) && syl.isFinal) {
    txt = changeElementSplit(txt, qametsHe, "a");
  }

  // transliterate map
  txt = [...txt]
    .map((char) => (char in transliterateMap ? transliterateMap[char] : char))
    .reduce((a, c) => a + c, "");

  return txt;
};

export const wordRules = (word: string): string => {
  if (word === "jehwa") {
    word = "Adonaj";
  }
  return word;
};
