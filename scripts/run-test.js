const { readdirSync, readFileSync, existsSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');

function runTest() {
  const packagesPath = join(process.cwd(), 'packages');
  const packages = readdirSync(packagesPath);
  packages.forEach(packageName => {
    const packagePath = join(packagesPath, packageName);
    const packageInfoPath = join(packagePath, 'package.json');
    if (existsSync(packageInfoPath)) {
      const packageInfo = JSON.parse(readFileSync(packageInfoPath));
      if (packageInfo.scripts && packageInfo.scripts.test) {
        spawnSync('npm', ['install'], {
          stdio: 'inherit',
          cwd: packagePath,
        });
        spawnSync('npm', ['run', 'test'], {
          stdio: 'inherit',
          cwd: packagePath,
        });
      }
    }
  });
}

runTest();
