const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const log = require('./log');

const ALL_PACKAGES = fs.readdirSync(path.join('packages'));

module.exports = function checkAndBuild(shouldBeBuiltPkgs) {
  // get all packages' package.json
  for (let i = 0; i < shouldBeBuiltPkgs.length; i++) {
    const pkgName = shouldBeBuiltPkgs[i];
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join('packages', pkgName, 'package.json'), {
        encoding: 'utf-8',
      })
    );

    // get all deps
    const allDeps = Object.keys(pkgJson.dependencies);

    // filter internal deps
    const internalDeps = allDeps.filter((dep) => ALL_PACKAGES.includes(dep));

    shouldBeBuiltPkgs.push(...internalDeps);
  }

  // cache built packages
  const builtPkgs = [];

  // deepest dep will at the tail of list
  // when package has been built, skip building
  shouldBeBuiltPkgs.reverse().forEach((pkgName) => {
    if (builtPkgs.includes(pkgName)) {
      return;
    }
    builtPkgs.push(pkgName);
    build(pkgName);
  });

  // log
  log.info('packages have been built in the following order:');
  builtPkgs.forEach((pkgName, index) => {
    console.log(`     ${index + 1}. ${pkgName}`);
  });
};

function build(pkgName) {
  execSync('npm run build', {
    stdio: 'inherit',
    cwd: path.join('packages', pkgName),
  });
  log.success(`built ${pkgName}\n`);
}
