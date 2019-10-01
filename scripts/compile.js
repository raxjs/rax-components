/**
 * script to build (transpile) files.
 * By default it transpiles all files for all packages and writes them
 * into `lib/` directory.
 * Non-js or files matching IGNORE_PATTERN will be copied without transpiling.
 *
 * Example:
 *  compile all packages: node ./scripts/compile.js
 *  watch compile some packages: node ./scripts/compile.js --watch --packages rax,rax-cli
 */
'use strict';

const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const spawnSync = require('child_process').spawnSync;

const babel = require('@babel/core');
const chalk = require('chalk');
const glob = require('glob');
const minimatch = require('minimatch');
const parseArgs = require('minimist');
const chokidar = require('chokidar');

const SRC_DIR = 'src';
const BUILD_DIR = 'lib';
const JS_FILES_PATTERN = '**/*.js';
const IGNORE_PATTERN = '**/{__tests__,__mocks__}/**';

const args = parseArgs(process.argv);
const customPackages = args.packages;

const babelOptions = require('../babel.config')();

babelOptions.babelrc = false;
// babelOptions.sourceMaps = 'inline';

const fixedWidth = str => {
  const WIDTH = 80;
  const strs = str.match(new RegExp(`(.{1,${WIDTH}})`, 'g'));
  let lastString = strs[strs.length - 1];
  if (lastString.length < WIDTH) {
    lastString += Array(WIDTH - lastString.length).join(chalk.dim('.'));
  }
  return strs.slice(0, -1).concat(lastString).join('\n');
};

function buildPackage(packagesDir, filePath) {
  var filename = filePath.split(packagesDir + '/')[1];

  if (fs.statSync(filePath).isDirectory() && filename.split('rax-')[1]) {

    if (process.argv[2]) {
      // build one package
      if (process.argv[2] == filename) {
        process.stdout.write(chalk.bold.inverse('Build one package\n'));
        shell.cd(path.join(filePath));
        shell.exec('npm run build');
        shell.cd('../');
      }
    } else {
      // build all package
      process.stdout.write(chalk.bold.inverse('Build all packages\n'));
      shell.cd(path.join(filePath));
      shell.exec('npm run build');
      shell.cd('../');
    }
  }


}

function getPackages(packagesDir, customPackages) {
  return fs.readdirSync(packagesDir)
    .map(file => path.resolve(packagesDir, file))
    .filter(f => {
      if (customPackages) {
        const packageName = path.relative(packagesDir, f).split(path.sep)[0];
        return packageName.indexOf(customPackages) !== -1;
      } else {
        return true;
      }
    })
    .filter(f => fs.lstatSync(path.resolve(f)).isDirectory());
}

// const packagesDir = path.resolve(__dirname, '../packages');
module.exports = function compile(packagesName) {
  const packagesDir = path.resolve(__dirname, `../${packagesName}`);
  process.stdout.write(chalk.bold.inverse('Compiling packages\n'));
  getPackages(packagesDir, customPackages).forEach(buildPackage.bind(null, packagesDir));
  process.stdout.write('\n');
};
