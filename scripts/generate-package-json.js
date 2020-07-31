/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

import { blue } from 'colors';

const writePackageJson = data => {
  writeFileSync('./dist/package.json', `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
};

const copyPackageJson = () => {
  execSync('cp ./package.json ./dist/');
};

const removeDevDependencies = () => {
  const mainPackageJson = JSON.parse(readFileSync('./dist/package.json'));
  delete mainPackageJson.devDependencies;
  writePackageJson(mainPackageJson);
};

const renamePackage = () => {
  const packageJson = JSON.parse(readFileSync('./dist/package.json'));
  packageJson.name = 'backpack-transpiled';
  writePackageJson(packageJson);
};

const addBackpackDependencies = () => {
  const srcJsonFiles = execSync('find backpack/packages -name "package.json" | grep -v node_modules')
    .toString()
    .split('\n')
    .filter(s => s !== '');

  const bpkDependencies = {};

  srcJsonFiles.forEach(sj => {
    console.log(blue(`parsing file ${sj}`));
    const fileContent = JSON.parse(readFileSync(sj));
    const deps = fileContent.dependencies;
    if (deps) {
      Object.keys(deps).forEach(d => {
        if (!d.startsWith('bpk-')) {
          bpkDependencies[d] = deps[d];
        }
      });
    }
  });

  const packageJson = JSON.parse(readFileSync('./dist/package.json'));
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...bpkDependencies,
  };
  writePackageJson(packageJson);
};

console.log('Creating package.json for `backpack-transpiled`');

copyPackageJson();
renamePackage();
removeDevDependencies();
addBackpackDependencies();

console.log('Done');
