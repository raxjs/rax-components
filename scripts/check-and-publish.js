/**
 * Scripts to check unpublished version and run publish
 */
const { existsSync, readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const { spawnSync } = require('child_process');
const axios = require('axios');
const semver = require('semver');

function checkVersion(folder, callback) {
  const ret = []; // { name: 'foo', workDir, latest: 'x.x.x', local: 'x.x.x'}
  if (existsSync(folder)) {
    const packages = readdirSync(folder);

    let finishCount = 0;
    function finish() {
      finishCount++;
      if (finishCount === packages.length) {
        callback(ret);
      }
    }

    for (let i = 0; i < packages.length; i++) {
      const package = packages[i];
      const packageInfoPath = join(folder, package, 'package.json');
      if (existsSync(packageInfoPath)) {
        const packageInfo = JSON.parse(readFileSync(packageInfoPath));
        getVersion(packageInfo.name)
          .then((version) => {
            if (version !== packageInfo.version) {
              ret.push({
                name: packageInfo.name,
                workDir: join(folder, package),
                latest: version,
                local: packageInfo.version
              });
            }
            finish();
          })
          .catch((err) => {
            console.log('Error: getting version of ' + packageInfoPath.name);
            console.log(err);
          })
      }
    }
  } else {
    callback(ret);
  }
}

function getVersion(pkg, tag = 'latest') {
  return axios(`http://registry.npmjs.com/${pkg}/${tag}`)
    .then((res) => res.data.version);
}

function publish(pkg, workDir, version, tag = 'latest') {
  console.log('[PUBLISH]', `${pkg}@${version} tag=${tag}`);

  spawnSync('npm', [
    'publish',
    '--tag=' + tag,
    // use default registry
  ], {
    stdio: 'inherit',
    cwd: workDir,
  });
}

function isPrerelease(v) {
  const semVer = semver.parse(v);
  if (semVer === null) return false;
  return semVer.prerelease.length > 0;
}

function checkVersionAndPublish() {
  checkVersion(join(__dirname, 'packages'), (ret) => {
    for (let i = 0; i < ret.length; i++) {
      const { name, workDir, latest, local } = ret[i];
      const tag = isPrerelease(local) ? 'beta' : 'latest';
      publish(name, workDir, local, tag);
    }
  });
}

checkVersionAndPublish();
