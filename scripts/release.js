/* eslint-disable no-console */
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';

import { inc } from 'semver';

import packageData, { version } from '../package.json';

const BLUE_START = '\x1B[0;34m';
const YELLOW_START = '\x1B[0;33m';
const COLOR_END = '\x1B[0m';

const blue = s => `${BLUE_START}${s}${COLOR_END}`;
const yellow = s => `${YELLOW_START}${s}${COLOR_END}`;

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

const updatePackageFile = newVersion => {
  const newPackageData = JSON.parse(JSON.stringify(packageData));
  newPackageData.version = newVersion;
  const fileContent = `${JSON.stringify(newPackageData, null, 2)}\n`;
  writeFileSync('package.json', fileContent, 'utf8');
  execSync('cp package.json ./dist/');
  console.log(blue('package.json updated'));
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
  execSync(`npm view gg-components version`)
    .toString()
    .split('\n')[0];

const bumpType = getBumpType();
const currentVersion = version;
const currentVersionPublished = getCurrentPublishedVersion();
if (currentVersion !== currentVersionPublished) {
  console.warn(
    yellow(
      `Published version (${currentVersionPublished}) does not match package.json version (${currentVersion})`,
    ),
  );
}
const newVersion = inc(currentVersion, bumpType);
console.log(`Publishing version ${newVersion}`);

updatePackageFile(newVersion);
createTag(newVersion);
commitChanges(newVersion);
publishPackage();
console.log('Done');
