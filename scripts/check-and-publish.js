/**
 * Scripts to check unpublished version and run publish
 */
const { existsSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const axios = require('axios');
const semver = require('semver');

function checkVersion(folder, callback) {
  const ret = []; // { name: 'foo', workDir, latest: 'x.x.x', local: 'x.x.x' }
  if (existsSync(folder)) {
    const packages = readdirSync(folder);
    console.log('[PUBLISH] Start check with following packages:');
    console.log(packages.map(p => '- ' + p).join('\n'));

    let finishCount = 0;
    function finish() {
      finishCount++;
      if (finishCount === packages.length) {
        callback(ret);
      }
    }

    for (let i = 0; i < packages.length; i++) {
      const packageFolderName = packages[i];
      const packageInfoPath = join(folder, packageFolderName, 'package.json');
      if (existsSync(packageInfoPath)) {
        const packageInfo = JSON.parse(readFileSync(packageInfoPath, { encoding: 'utf-8' }));
        checkVersionExists(packageInfo.name, packageInfo.version)
          .then((exists) => {
            if (!exists) {
              ret.push({
                name: packageInfo.name,
                workDir: join(folder, packageFolderName),
                main: packageInfo.main,
                local: packageInfo.version,
              });
            }

            finish();
          });
      }
    }
  } else {
    callback(ret);
  }
}

function checkVersionExists(pkg, version) {
  return axios(`http://registry.npmjs.com/${encodeURIComponent(pkg)}/${encodeURIComponent(version)}`, { timeout: 2000 })
    .then((res) => res.status === 200)
    .catch(err => false);
}

function checkBuildSuccess(workDir, main) {
  return existsSync(join(workDir, main));
}

function publish(pkg, workDir, main, version, tag) {
  console.log('[PUBLISH]', `${pkg}@${version}`);

  // npm install
  spawnSync('npm', [
    'install',
  ], {
    stdio: 'inherit',
    cwd: workDir,
  });

  // npm publish
  if (checkBuildSuccess(workDir, main)) {
    spawnSync('npm', [
      'publish',
      '--tag=' + tag,
      // use default registry
    ], {
      stdio: 'inherit',
      cwd: workDir,
    });
  } else {
    console.log(`[PUBLISH] ${pkg}@${version} failed, Please check build script.`);
  }
}

function isPrerelease(v) {
  const semVer = semver.parse(v);
  if (semVer === null) return false;
  return semVer.prerelease.length > 0;
}

function checkVersionAndPublish() {
  checkVersion(join(__dirname, '../packages'), (ret) => {
    console.log('');
    if (ret.length === 0) {
      console.log('[PUBLISH] No diff with all packages.');
    } else {
      console.log('[PUBLISH] Will publish following packages:');
    }

    for (let i = 0; i < ret.length; i++) {
      const { name, workDir, main, local } = ret[i];
      const tag = isPrerelease(local) ? 'beta' : 'latest';
      console.log(`--- ${name}@${local} current tag: ${tag} ---`);
      publish(name, workDir, main, local, tag);
    }
  });
}

checkVersionAndPublish();
