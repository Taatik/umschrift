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
