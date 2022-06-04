/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
import stylish from './stylish.js';
import plain from './plain.js';

const formatters = {
  stylish: stylish,
  plain: plain,
}

const formatter = (ast, format) => formatters[format](ast);

export default formatter;
