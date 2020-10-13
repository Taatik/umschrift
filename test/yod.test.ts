import { Text } from "../src/index";

describe.each`
  description                                  | hebrew             | transliteration
  ${"consonantal yod"}                         | ${"יָם"}           | ${"jam"}
  ${"const yod with hiriq as vowel"}           | ${"יַיִן"}         | ${"jajin"}
  ${"hiriq yod: medial"}                       | ${"עִיר"}          | ${"ir"}
  ${"hiriq yod: final"}                        | ${"אֲנִי"}         | ${"ani"}
  ${"hiriq yod: final with maqqef"}            | ${"וַֽיְהִי־כֵֽן"} | ${"wajhi-chen"}
  ${"hiriq followed by const yod (fake word)"} | ${"רִיֵּם"}        | ${"rijem"}
  ${"medial tsere-yod"}                        | ${"אֵין"}          | ${"en"}
  ${"final tsere-yod"}                         | ${"רִגְעֵי"}       | ${"rige"}
`("$description", ({ description, hebrew, transliteration }) => {
  const heb = new Text(hebrew);
  const transliteratedHeb = heb.transliterate();
  test(`${description} to equal: ${transliteration}`, () => {
    expect(transliteratedHeb).toEqual(transliteration);
  });
});
