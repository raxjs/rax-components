module.exports = function traverseGraph(packages, completedPackages) {
  const { name, localDependencies } = packages;
  if (completedPackages.includes(name)) return;

  if (localDependencies.length) {
    for (let i = 0; i < localDependencies.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      traverseGraph(localDependencies[i], completedPackages);
    }
  }

  completedPackages.push(name);
}
