import optimizer from '../../lib/optimizer';

jest.mock('universal-env', () => {
  return {
    isWeb: true
  };
});

function parseSuffix(suffix) {
  const result = [];
  let ret = [];

  if (typeof suffix === 'string') {
    ret = suffix.split(',');
  }

  if (Array.isArray(suffix)) {
    ret = suffix;
  }

  if (ret && ret[0]) {
    result[0] = ret[0];
  }
  if (ret && ret[1]) {
    result[1] = ret[1];
  }

  return result;
}

function getQualitySuffix(highQuality, suffix) {
  const _suffix = parseSuffix(suffix);
  return highQuality ? _suffix[0] : _suffix[1];
}

describe('optimizer', () => {
  it('should return a compressed url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      compressSuffix: getQualitySuffix(false, ['Q75', 'Q50'])
    });
    expect(url).toBe('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png_Q50.jpg');
  });
  it('should return a webp url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      webp: true
    });
    expect(url).toBe('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png_.webp');
  });
  it('should return a removeScheme url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      removeScheme: true
    });
    expect(url).toBe('//img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png');
  });
  it('should return a replaceDomain url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      replaceDomain: true
    });
    expect(url).toBe('https://gw.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png');
  });
  it('should return a scalingWidth url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      scalingWidth: '20rpx'
    });
    expect(url).toBe('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png_110x10000.jpg');
  });
  it('should return a no ignoreGif url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      ignoreGif: false
    });
    expect(url).toBe('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png');
  });
  it('should return a ignoreGif url', () => {
    const url = optimizer('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png', {
      ignoreGif: true
    });
    expect(url).toBe('https://img.alicdn.com/tfs/TB1JZZdi4D1gK0jSZFsXXbldVXa-155-155.png');
  });
});
