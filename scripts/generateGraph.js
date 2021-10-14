function checkDependent(source, target) {
  const { dependencies: sourceDependencies, name: sourceName } = source;
  const { dependencies: targetDependencies, name: tagetName } = target;
  return [
    Object.keys(sourceDependencies).includes(tagetName),
    Object.keys(targetDependencies).includes(sourceName),
  ];
}

/**
 * @param {*} packageEntities package
 * @returns packageEntities
 */
function generateGraph(packageEntities) {
  const graphs = [...packageEntities];

  for (let i = 0; i < graphs.length; i++) {
    for (let j = i + 1; j < graphs.length; j++) {
      const source = graphs[i];
      const target = graphs[j];

      const [targetExist, sourceExist] = checkDependent(source, target);

      if (targetExist && sourceExist) {
        const message = `[BUILDER] Circular dependencies between ${source.name} and ${target.name}`;
        throw new Error(message);
      }

      if (targetExist) {
        source.localDependencies.push(target);
        target.localDependents.push(source);
      }

      if (sourceExist) {
        source.localDependents.push(target);
        target.localDependencies.push(source);
      }
    }
  }

  return graphs;
}

module.exports = generateGraph;
