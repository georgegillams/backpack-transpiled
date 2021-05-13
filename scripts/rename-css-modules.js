/* eslint-disable no-console */
import { rename } from 'fs';
import { execSync } from 'child_process';

const renameFile = file =>
  new Promise((resolve, reject) => {
    const newFileName = file.split('.module.css').join('.css');
    rename(file, newFileName, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

console.log('Renaming CSS module files...');
console.log('');

const cssFiles = execSync('find dist -name "*.module.css" | grep -v node_modules')
  .toString()
  .split('\n')
  .filter(s => s !== '');

const updatePromises = cssFiles.map(cF => renameFile(cF));

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
