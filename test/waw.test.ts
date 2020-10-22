import { Text } from "../src/index";

describe.each`
  description                              | hebrew           | transliteration
  ${"consonantal waw"}                     | ${"וָו"}         | ${"waw"}
  ${"waw haser (holem precedes waw)"}      | ${"שָׁלֹום"}      | ${"schalom"}
  ${"waw haser (holem proceeds waw)"}      | ${"שָׁלוֹם"}     | ${"schalom"}
  ${"shureq"}                              | ${"קוּם"}        | ${"kum"}
  ${"initial shureq"}                      | ${"וּבָם"}       | ${"uwam"}
  ${"initial shureq followed by shewa"}    | ${"וּלְזַמֵּ֖ר"} | ${"ulesamer"}
  ${"Consonantal vav with holem as vowel"} | ${"עָוֹן"}       | ${"awon"}
`("$description", ({ description, hebrew, transliteration }) => {
  const heb = new Text(hebrew);
  const transliteratedHeb = heb.transliterate();
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
