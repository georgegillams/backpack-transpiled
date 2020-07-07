/* eslint-disable no-console */
import { readFile, writeFile } from 'fs';
import { execSync } from 'child_process';

const updateImports = (file, findReplaces) =>
  new Promise((resolve, reject) => {
    readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }
      let result = data;
      findReplaces.forEach(fr => {
        const splitFile = result.split(fr.find);
        if (splitFile.length === 1) {
          return;
        }
        result = splitFile.join(fr.replace);
      });

      writeFile(file, result, 'utf8', err2 => {
        if (err2) return reject(err2);
        resolve();
        return null;
      });
    });
  });

console.log('Crunching import modules...');
console.log('');

const findReplaces = [
  { find: 'require("bpk-', replace: 'require("../../bpk-' },
];

const jsFiles = execSync(
  'find dist -name "*.js" -o -name "*.jsx" | grep -v node_modules',
)
  .toString()
  .split('\n')
  .filter(s => s !== '');

const updatePromises = jsFiles.map(jF => updateImports(jF, findReplaces));

Promise.all(updatePromises).then(() => {
  console.log('All good.  👍');
  process.exit(0);
});
