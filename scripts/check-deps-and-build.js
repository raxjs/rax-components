const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');
const log = require('./log');

const ALL_PACKAGES = readdirSync('packages').map(
  (pkgName) =>
    JSON.parse(
      readFileSync(join('packages', pkgName, 'package.json'), {
        encoding: 'utf-8',
      })
    ).name
);

// purely math method
// when only one layer of deps
// deps queue is at most the length of the square of the number of packages
const MAX_PKGS_LENGTH = Math.pow(ALL_PACKAGES.length, 2);

module.exports = function checkDepsAndBuild(shouldBeBuiltPkgs) {
  // get all packages' package.json
  for (const pkgName of shouldBeBuiltPkgs) {
    const pkgJson = JSON.parse(
      readFileSync(join('packages', pkgName, 'package.json'), {
        encoding: 'utf-8',
      })
    );

    // get all deps
    const allDeps = Object.keys(pkgJson.dependencies);

    // filter internal deps
    const allInternalDeps = allDeps.filter((dep) => ALL_PACKAGES.includes(dep));

    shouldBeBuiltPkgs.push(...allInternalDeps);

    // HACK: when the length of deps queue is largest than
    // the length of the square of the number of packages
    // it is very likely that there is a circular dep
    if (shouldBeBuiltPkgs.length > MAX_PKGS_LENGTH) {
      throw Error('circular deps');
    }
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
    log.success(`built ${pkgName}\n`);
  });

  // log
  console.log('packages have been built in the following order:');
  builtPkgs.forEach((pkgName, index) => {
    console.log(`${index + 1}. ${pkgName}`);
  });
};

function build(pkgName) {
  execSync('npm run build', {
    stdio: 'inherit',
    cwd: join('packages', pkgName),
  });
}
