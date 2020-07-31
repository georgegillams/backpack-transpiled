/* eslint-disable no-console */
import { readFile, writeFile } from 'fs';
import { execSync } from 'child_process';

const calculateDepth = filePath => {
  const depth = Math.max(0, filePath.split('/').length - 2);
  return depth;
};

const importReplacement = depth => {
  let result = 'require("';
  for (let i = 0; i < depth; i += 1) {
    result += '../';
  }
  result += 'bpk-';
  return result;
};

const updateImports = file =>
  new Promise((resolve, reject) => {
    const depth = calculateDepth(file);
    readFile(file, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      let result = data;
      const splitFile = result.split('require("bpk-');
      const replacement = importReplacement(depth);
      result = splitFile.join(replacement);

      writeFile(file, result, 'utf8', err2 => {
        if (err2) return reject(err2);
        resolve();
        return null;
      });
    });
  });

console.log('Crunching import modules...');
console.log('');

const jsFiles = execSync('find dist -name "*.js" -o -name "*.jsx" | grep -v node_modules')
  .toString()
  .split('\n')
  .filter(s => s !== '');

const updatePromises = jsFiles.map(jF => updateImports(jF));

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
