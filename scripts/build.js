const fs = require('fs');
const path = require('path');
const checkAndBuild = require('./check-and-build');

(() => {
  const allPkgs = fs.readdirSync(path.join('packages'));

  checkAndBuild(allPkgs);
})();
