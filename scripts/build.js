const { readdirSync } = require('fs');
const checkAndBuild = require('./check-deps-and-build');

(() => {
  const allPkgs = readdirSync('packages');

  checkAndBuild(allPkgs);
})();
