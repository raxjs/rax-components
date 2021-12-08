export default function omit(obj: Record<string, any>, fields: string[]): Record<string, any> {
  const shallowCopy = Object.assign({}, obj);

  for (let i = 0; i < fields.length; i++) {
    const key = fields[i];
    if (shallowCopy.hasOwnProperty(key)) {
      delete shallowCopy[key];
    }
  }

  return shallowCopy;
}