import { Text as Havarot } from "./text";

interface TextOpts {
  qametsQatan?: boolean;
  longVowels?: boolean;
  sqnmlvy?: boolean;
  wawShureq?: boolean;
}

class Text extends Havarot {
  constructor(
    text: string,
    options: TextOpts = {
      qametsQatan: true,
      longVowels: true,
      sqnmlvy: false,
      wawShureq: false,
    }
  ) {
    super(text, options);
  }
}

export { Text };
