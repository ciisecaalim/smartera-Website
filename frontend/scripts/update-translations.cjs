const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'src/i18n/messages.json');
const aliasesFile = path.join(root, 'src/i18n/source-aliases.json');
const dictionary = JSON.parse(fs.readFileSync(file, 'utf8'));
const aliases = fs.existsSync(aliasesFile) ? JSON.parse(fs.readFileSync(aliasesFile, 'utf8')) : {};
for (const line of fs.readFileSync(process.argv[2], 'utf8').split(/\r?\n/)) {
  if (!line.trim()) continue;
  const split = line.indexOf('|');
  if (split < 1) throw Error('Missing translation separator: ' + line);
  const en = line.slice(0, split), so = line.slice(split + 1);
  if (dictionary[en] && dictionary[en] !== so) aliases[dictionary[en]] = en;
  dictionary[en] = so;
}
fs.writeFileSync(file, JSON.stringify(dictionary, null, 2) + '\n');
fs.writeFileSync(aliasesFile, JSON.stringify(aliases, null, 2) + '\n');
console.log(Object.keys(dictionary).length + ' translated messages');