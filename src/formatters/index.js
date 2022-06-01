import stylish from './stylish.js';

const formatters = {
  stylish: stylish,
}

const formatter = (ast, format) => formatters[format](ast);

export default formatter;