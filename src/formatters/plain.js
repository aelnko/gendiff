import _ from 'lodash';

const formatValue = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value !== 'string' || value === 'null') {
    return `${value}`;
  }
  return `'${value}'`;
}

const plain = (ast, parent = '') => {
  const iter = (node, parent) => {
    const path = parent.length > 0 ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'added': {
        return `Property '${path}' was added with value: ${formatValue(node.value)}`
      }
      case 'removed': {
        return `Property '${path}' was removed`
      }
      case 'changed': {
        return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
      }
      case 'nested': {
        return plain(node.children, path)
      }
    }
  }
  return ast.filter((node) => node.type !== 'none')
            .flatMap((node) => iter(node, parent))
            .join('\n');
}

export default plain;
