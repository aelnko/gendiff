/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import buildTree from './buildAST.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getFormat = (filepath) => {
  const formatFilepath = String(filepath);
  const format = path.extname(formatFilepath);
  return format;
};

export const getFileData = (filepath) => {
  const format = getFormat(filepath);
  const formatFilepath = String(filepath);
  const data = parse(fs.readFileSync(path.resolve('__fixtures__', formatFilepath)), format);
  return data;
};

const gendiff = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = getFileData(filepath1);
  const obj2 = getFileData(filepath2);
  return formatter(buildTree(obj1, obj2), format);
};

export default gendiff;
