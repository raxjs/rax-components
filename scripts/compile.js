/**
 * node scripts/compile.js
 * NPM=tnpm node scripts/compile.js
 * node scripts/compile.js --packages rax-text
 */
'use strict';

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const chalk = require('chalk');
const parseArgs = require('minimist');

const args = parseArgs(process.argv);
const customPackages = args.packages;

const packagesDir = path.resolve(__dirname, '../packages');

(async function compile() {
  process.stdout.write(chalk.bold.inverse('Compiling packages\n'));
  const packages = getPackages(packagesDir, customPackages);

  for (const packageName of packages) {
    await buildPackage(packageName);
  }
})();

function buildPackage(packageName) {
  const packagePath = path.join(packagesDir, packageName);

  console.log(`\n Start compile ${packageName}`);
  shell.cd(packagePath);
  shell.exec('npm run build');
  console.log(`\n Success compile ${packageName}`);
}

function getPackages(packagesDir, customPackages) {
  return fs.readdirSync(packagesDir)
    .filter(packageName => {
      // path.resolve(packagesDir, packageName))
      if (!/^rax-/.test(packageName)) {
        return false;
      } else if (customPackages) {
        return customPackages.indexOf(packageName) !== -1;
      } else {
        return true;
      }
    });
}
