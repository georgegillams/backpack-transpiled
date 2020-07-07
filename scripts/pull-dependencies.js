/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

import { blue } from './colors';

console.log('Pulling dependencies...');
console.log('');

const srcJsonFiles = execSync(
  'find backpack/packages -name "package.json" | grep -v node_modules',
)
  .toString()
  .split('\n')
  .filter(s => s !== '');

const dependencies = {};

srcJsonFiles.forEach(sj => {
  console.log(blue(`parsing file ${sj}`));
  const fileContent = JSON.parse(readFileSync(sj));
  const deps = fileContent.dependencies;
  if (deps) {
    Object.keys(deps).forEach(d => {
      if (!d.startsWith('bpk-')) {
        dependencies[d] = deps[d];
      }
    });
  }
});

const mainPackageJson = JSON.parse(readFileSync('package.json'));
mainPackageJson.dependencies = dependencies;
writeFileSync(
  'package.json',
  JSON.stringify(mainPackageJson, null, 2),
  'utf-8',
);

console.log('All good.  👍');
process.exit(0);
