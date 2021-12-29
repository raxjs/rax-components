const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const log = require('./log');

const GIT_DIFF_OF_LAST_COMMIT = 'git diff --name-only HEAD~ HEAD';
const ALL_PACKAGES = fs.readdirSync(path.join('packages'));

(() => {
  // get all modified files from last commit
  const files = execSync(GIT_DIFF_OF_LAST_COMMIT).toString().split('\n');

  // filter modified files in packages
  const pkgFiles = files.filter((file) => /^packages\//.test(file));

  const modifiedPkgs = [];
  // const modifiedPkgs = fs.readdirSync(path.join('packages'));

  // get all modified packages
  pkgFiles.forEach((pkgFile) => {
    const [, pkgName] = pkgFile.split('/');

    if (!modifiedPkgs.includes(pkgName)) {
      modifiedPkgs.push(pkgName);
    }
  });

  // get all modified packages' package.json
  for (let i = 0; i < modifiedPkgs.length; i++) {
    const pkgName = modifiedPkgs[i];
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join('packages', pkgName, 'package.json'), {
        encoding: 'utf-8',
      })
    );

    // get all deps
    const allDeps = Object.keys(pkgJson.dependencies);

    // filter internal deps
    const internalDeps = allDeps.filter((dep) => ALL_PACKAGES.includes(dep));

    modifiedPkgs.push(...internalDeps);
  }

  // cache built packages
  const builtPkgs = [];

  // deepest dep will at the tail of list
  // when package is built, skip building
  modifiedPkgs.reverse().forEach((pkgName) => {
    if (builtPkgs.includes(pkgName)) {
      return;
    }
    build(pkgName);
    builtPkgs.push(pkgName);
  });

  // log
  log.info('packages have been built in the following order:');
  builtPkgs.forEach((pkgName, index) => {
    console.log(`${index + 1}. ${pkgName}`);
  });
})();

function build(pkgName) {
  execSync('npm run build', {
    stdio: 'inherit',
    cwd: path.join('packages', pkgName),
  });
  log.success(`built ${pkgName}\n`);
}
