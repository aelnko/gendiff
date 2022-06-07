/* eslint-disable import/extensions */
/* eslint-disable object-shorthand */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish: stylish,
  plain: plain,
  json: json,
}

const formatter = (ast, format) => formatters[format](ast);

export default formatter;
