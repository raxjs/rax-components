const fs = require('fs');
const path = require('path');

const pkgsDir = path.join(__dirname, '../packages');

let names = fs.readdirSync(pkgsDir).filter(item => {
  return /^rax-/.test(item);
});

/**
  "main": "lib/index.js",
  "module": "es/index.js",
  "types": "lib/index.d.ts",
  "miniprogram": ".",
  "miniappConfig": {
    "main:quickapp": "lib/quickapp/index",
    "main": "lib/miniapp/index",
    "main:wechat": "lib/miniapp-wechat/index"
  },
  "quickappConfig": {
    "main": "lib/quickapp/index"
  },
 */

// names = [ 'rax-barcode' ];
names.forEach((dirname) => {
  const dirPath = path.join(pkgsDir, dirname);
  const pkgPath = path.join(dirPath, 'package.json');

  let pkgData = JSON.parse(fs.readFileSync(pkgPath));
  let newData = pkgData;

  delete newData.scripts.clean;
  newData.scripts.build = "../../node_modules/.bin/build-scripts build --config ../../build.json --skip-demo";
  // delete pkgData.files;
  // pkgData.types = 'lib/index.d.ts';
  // pkgData.module = 'es/index.js';
  fs.writeFileSync(pkgPath, JSON.stringify(newData, null, 2));

  // fs.writeFileSync(path.join(dirPath, 'CHANGELOG.md'), '# Changelog');

  // ['.editorconfig', '.gitignore', '.npmignore', 'babel.config.js', 'jest.config.js'].forEach(item => {
  //   try {
  //     fs.unlinkSync(path.join(dirPath, item));
  //   } catch (err) {}
  // });

});