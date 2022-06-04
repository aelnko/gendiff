/* eslint-disable no-unused-expressions */
/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
/* eslint-disable space-unary-ops */
/* eslint-disable no-restricted-syntax */
import _ from 'lodash';

const makeIndent = (depth, sign, str = ' ') => {
  const indentStep = 4;
  const indent = str.repeat(depth * indentStep);
  return sign === undefined ? indent : `${indent.slice(2)}${sign} `;
}

const wrapper = (data, depth) => {
  const closingBracketIndent = makeIndent(depth - 1);
  return `{\n${data}\n${closingBracketIndent}}`;
}

const formatter = (object, depth) => {
  const indent = makeIndent(depth + 1);
  const data = Object.entries(object)
    .map(([key, value]) => {
      if (!_.isPlainObject(value)) {
        return `${indent}${key}: ${value}`;
      } else {
        return `${indent}${key}: ${formatter(value, depth + 1)}`;
      }
    })
    .join('\n');
  return wrapper(data, depth + 1);
}

const formatValue = (value, indentCount) => {
  if (_.isPlainObject(value)) {
    return formatter(value, indentCount);
  } else {
    return `${value}`;
  }
};

const stylish = (ast, depth = 1) => {
  const iter = (node) => {
    switch (node.type) {
      case 'added': {
        const indent = makeIndent(depth, '+');
        return `${indent}${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'removed': {
        const indent = makeIndent(depth, '-');
        return `${indent}${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'none': {
        const indent = makeIndent(depth);
        return `${indent}${node.key}: ${formatValue(node.value, depth)}`;
      }
      case 'changed': {
        const removedIndent = makeIndent(depth, '-');
        const addedIndent = makeIndent(depth, '+');
        return [
          `${removedIndent}${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${addedIndent}${node.key}: ${formatValue(node.newValue, depth)}`,
        ];
      }
      case 'nested': {
        const indent = makeIndent(depth);
        const children = stylish(node.children, depth + 1);
        return `${indent}${node.key}: ${children}`;
      }
    }
  };

  const tree = ast
    .flatMap((node) => iter(node))
    .join('\n');
  
  return wrapper(tree, depth);
};

export default stylish;
