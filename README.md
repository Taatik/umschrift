# Umschrift

A tool for transliterating liturgical Hebrew texts to German.
It is an augmentation of [havarot](https://github.com/charlesLoder/havarot).

## install

Requirements:

- `node`
- `npm`

To check for these, in you terminal type `which node` and `which npm`.
If nothing is returned, you'll need to install `node`, which installs `npm` along with it.

Download this repo.

```bash
cd umschrift
npm install # installs the necessary dependencies
npm run build # creates ./dist directory
```

## example

There is an `./example` directory containing a `.txt` file of Psa 23:1-4, and a file for using `umschrift`.
Once the `./dist` directory has been created, you can run `node ./examples/example.js`.
This will create a `psa23.1-4-TRANSLITERATION.txt` file.
