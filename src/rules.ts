import { Syllable } from "havarotjs/dist/syllable";
import { transliterateMap } from "./hebCharTrans";

const changeElementSplit = (input: string, split: RegExp, join: string) =>
  input.split(split).join(join);

export const syllableRules = (syl: Syllable): string => {
  let returnTxt: string = "";
  const taamim = /[\u{0590}-\u{05AF},\u{05BD},\u{05BF}]/u;
  let sylTxt = syl.text.replace(taamim, "");
  // 3ms suffix
  const threeMSSuffix = /\u{05B8}\u{05D9}\u{05D5}/u;
  if (threeMSSuffix.test(sylTxt) && syl.isFinal) {
    returnTxt = changeElementSplit(sylTxt, threeMSSuffix, "aw");
  } else {
    syl.clusters.forEach((cluster) => {
      let clusterTrans = cluster.text;
      clusterTrans = clusterTrans.replace(taamim, "");
      /******************
       * SPIRANTIZATION
       ******************/
      // bet with dagesh > b
      if (/ב\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /ב\u{05BC}/u, "b");
      }

      // gimel with dagesh > g
      if (/ג\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /ג\u{05BC}/u, "g");
      }

      // dalet with dagesh > d
      if (/ד\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /ד\u{05BC}/u, "d");
      }

      // kaph with dagesh > k
      if (/כ\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /כ\u{05BC}/u, "k");
      }

      // final kaph with dagesh > k
      if (/ך\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /ך\u{05BC}/u, "k");
      }

      // peh with dagesh > p
      if (/פ\u{05BC}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /פ\u{05BC}/u, "p");
      }

      if (cluster.isMater) {
        clusterTrans = /\u{05BE}/u.test(clusterTrans) ? "\u{05BE}" : "";
      }

      if (cluster.isShureq) {
        clusterTrans = "u";
      }

      if (cluster.hasShewa && syl.isClosed) {
        const shewa = /\u{05B0}/u;
        clusterTrans = clusterTrans.replace(shewa, "");
      }

      if (syl.isFinal && !syl.isClosed) {
        const furtiveChet = /\u{05D7}\u{05B7}$/mu;
        const furtiveHe = /\u{05D4}\u{05BC}\u{05B7}$/mu;

        if (furtiveChet.test(clusterTrans)) {
          clusterTrans = changeElementSplit(
            clusterTrans,
            furtiveChet,
            "\u{05B7}\u{05D7}"
          );
        } else if (furtiveHe.test(clusterTrans)) {
          clusterTrans = changeElementSplit(
            clusterTrans,
            furtiveHe,
            "\u{05B7}"
          );
        }
      }

      // shin > sch
      if (/ש\u{05C1}/u.test(clusterTrans)) {
        clusterTrans = changeElementSplit(clusterTrans, /ש\u{05C1}/u, "sch");
      }

      returnTxt += clusterTrans;
    });
  }

  returnTxt = [...returnTxt]
    .map((char) => (char in transliterateMap ? transliterateMap[char] : char))
    .reduce((a, c) => a + c, "");

  return returnTxt;
};
