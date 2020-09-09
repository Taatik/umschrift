const Text = require("../dist/index").Text;
const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function processLineByLine(file) {
  const newFileName = file.replace(".txt", "-TRANSLITERATION.txt");
  const fileStream = fs.createReadStream(file);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const logger = fs.createWriteStream(newFileName, { flags: "a" });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    const heb = new Text(line);
    const transliteration = heb.transliterate();
    logger.write(`${transliteration}\n`);
  }
}

const files = fs.readdirSync(__dirname);
const txtFiles = files.filter((file) => path.extname(file) === ".txt");
txtFiles.forEach((file) => processLineByLine(path.join(__dirname, file)));
