const { execSync } = require('child_process');
const checkAndBuild = require('./check-and-build');

const GIT_DIFF_OF_LAST_COMMIT = 'git diff --name-only HEAD~ HEAD';

(() => {
  // get all modified files from last commit
  const files = execSync(GIT_DIFF_OF_LAST_COMMIT).toString().split('\n');

  // filter modified files in packages
  const pkgFiles = files.filter((file) => /^packages\//.test(file));

  const modifiedPkgs = [];

  // get all modified packages
  pkgFiles.forEach((pkgFile) => {
    const [, pkgName] = pkgFile.split('/');

    if (!modifiedPkgs.includes(pkgName)) {
      modifiedPkgs.push(pkgName);
    }
  });

  checkAndBuild(modifiedPkgs);
})();
