/* eslint-disable no-console */
import { readFile, writeFile } from 'fs';
import { execSync } from 'child_process';

const removeNoTouchSupport = (file, findReplaces) =>
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

console.log('Crunching no-touch-support...');
console.log('');

const findReplaces = [
  { find: '.bpk-no-touch-support ', replace: '' },
  { find: ':global(.bpk-no-touch-support) ', replace: '' },
];

const cssFiles = execSync('find dist -name "*.css" | grep -v node_modules')
  .toString()
  .split('\n')
  .filter(s => s !== '');

const updatePromises = cssFiles.map(cF => removeNoTouchSupport(cF, findReplaces));

Promise.all(updatePromises)
  .then(() => {
    console.log('All good.  👍');
    process.exit(0);
    return true;
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
