import { Text } from "../src/index";

describe.each`
  description                            | hebrew                         | transliteration
  ${"no special features"}               | ${"לֶ֬חֶם"}                    | ${"lechem"}
  ${"gemination"}                        | ${"רַנֵּן"}                    | ${"ranen"}
  ${"furtive patach, chet"}              | ${"מָשִׁיחַ"}                  | ${"maschiach"}
  ${"furtive patach, ayin"}              | ${"שָׁמֵ֑עַ"}                  | ${"schamea"}
  ${"furtive patach, he"}                | ${"גָבֹ֗הַּ"}                  | ${"gawoa"}
  ${"final chet w/ patach, NOT furtive"} | ${"מִתַּ֣חַת"}                 | ${"mitachat"}
  ${"final qamets-he"}                   | ${"מַלְכָּה"}                  | ${"malka"}
  ${"divine name"}                       | ${"יְהוָ֣ה"}                   | ${"Adonaj"}
  ${"3ms suffix"}                        | ${"תֹּורֹתָֽיו"}               | ${"torotaw"}
  ${"multiple words and passeq"}         | ${"כְּשֶׁ֣בֶת ׀ הַמֶּ֣לֶךְ"}   | ${"keschewet hamelech"}
  ${"mixed with latin chars"}            | ${"אֲבֹותֵינוּ (לְעֹולָם)"}    | ${"awotenu (leolam)"}
  ${"qamets qatan"}                      | ${"כָּל הָעוֹלָם כָּל־הָעֵ֛ץ"} | ${"kol haolam kol-haez"}
`("$description", ({ description, hebrew, transliteration }) => {
  const heb = new Text(hebrew);
  const transliteratedHeb = heb.transliterate();
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
