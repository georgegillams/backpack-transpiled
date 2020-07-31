/* eslint-disable no-console */
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

import { inc } from 'semver';
import { blue, yellow } from 'colors';

import { version } from '../package.json';

console.log('Starting release');
console.log('');

const getBumpType = () => {
  if (process.argv.includes('--major')) {
    return 'major';
  }
  if (process.argv.includes('--minor')) {
    return 'minor';
  }
  if (process.argv.includes('--patch')) {
    return 'patch';
  }

  console.warn(yellow(`No release type specified. Defaulting to patch.`));
  return 'patch';
};

const writePackageJson = (filePath, data) => {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8');
};

const updatePackageVersion = (filePath, newVersion) => {
  const packageData = JSON.parse(readFileSync(filePath));
  packageData.version = newVersion;
  writePackageJson(filePath, packageData);
  console.log(blue('package.json updated'));
};

const updatePackageVersions = newVersion => {
  updatePackageVersion('package.json', newVersion);
  updatePackageVersion('dist/package.json', newVersion);
};

const createTag = newVersion => {
  execSync(`git tag ${newVersion} && git push --tags`);
  console.log(blue('Release tagged'));
};

const commitChanges = newVersion => {
  execSync(`git add .`);
  execSync(`git commit -m "Publish ${newVersion}"`);
  execSync(`git push`);
  console.log(blue('Code pushed'));
};

const publishPackage = () => {
  execSync(`(cd dist && npm publish)`);
  console.log(blue('Package published'));
};

const getCurrentPublishedVersion = () =>
  execSync(`npm view backpack-transpiled version`)
    .toString()
    .split('\n')[0];

const bumpType = getBumpType();
const currentVersion = version;
const currentVersionPublished = getCurrentPublishedVersion();
if (currentVersion !== currentVersionPublished) {
  console.warn(
    yellow(`Published version (${currentVersionPublished}) does not match package.json version (${currentVersion})`)
  );
}
const newVersion = inc(currentVersion, bumpType);
console.log(`Publishing version ${newVersion}`);

updatePackageVersions(newVersion);
commitChanges(newVersion);
createTag(newVersion);
publishPackage();
console.log('Done');
