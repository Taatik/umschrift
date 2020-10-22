# Umschrift

A tool for transliterating liturgical Hebrew texts to German.
It is an augmentation of [havarot](https://github.com/charlesLoder/havarot).

## about

This schema for transliteration was developed by Rabbi Zsolt.
Its purpose is to transliterate litrugical Hebrew into German orthography.

## install

### npm

`npm install umschrift`

### local

Download or clone this repository.

```bash
cd unschrift
npm install
npm run build
```

## example

```javascript
const umschrift = require("umschrift");
const Text = umschrift.Text;
const heb = new Text("שָׁלֹום");
const transliteration = heb.transliterate();
transliteration;
// schalom
```

## Schema

### Consonants

For consonants with slashes, the left hand side reprsents the unmarked (i.e. spirantized) form, and the right side is the marked form.

| Consonant | Transliteration | Consonant | Transliteration |
| :-------: | :-------------: | :-------: | :-------------: |
|     א     |                 |    מ ם    |        m        |
|     ב     |       b/w       |    נ ן    |        n        |
|     ג     |        g        |     ס     |       ss        |
|     ד     |        d        |     ע     |        -        |
|     ה     |        h        |    פ ף    |      p/v/f      |
|     ו     |        w        |    צ ץ    |        z        |
|     ז     |        s        |     ק     |        k        |
|     ח     |       ch        |     ר     |        r        |
|     ט     |        t        |    שׂ     |       ss        |
|     י     |        j        |    שׁ     |       sch       |
|    כ ך    |      k/ch       |     ת     |        t        |
|     ל     |        l        |           |                 |

### Vowels

|        Vowel        | Transliteration |      Vowel       | Transliteration |
| :-----------------: | :-------------: | :--------------: | :-------------: |
|      ◌ַ patakh      |        a        |  י◌ִ hireq yod   |        i        |
|  ◌ַ furtive patakh  |        a        | ◌ָ qamets katan  |        o        |
|      ◌ָ qamets      |        a        |     ◌ֹ holem     |        o        |
| ה◌ָ final qamets he |        a        |  וֹ full holem   |        o        |
| יו◌ָ three 3ms sufx |       aw        | ◌ֻ short qibbuts |        u        |
|      ◌ֶ segol       |        e        | ◌ֻ long qibbuts  |        u        |
|      ◌ֵ tsere       |        e        |    וּ shureq     |        u        |
|    י◌ֵ tsere yod    |        e        | ◌ֳ khatef qamets |        o        |
|    י◌ֶ segol yod    |        e        | ◌ֲ khatef patakh |        a        |
|   ◌ִ short hiriq    |        i        | ◌ֱ khatef segol  |        e        |
|    ◌ִ long hiriq    |        i        |  ◌ְ vocal shewa  |        e        |
