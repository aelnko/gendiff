/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import { fileURLToPath } from 'url';
import buildTree from './buildAST.js';
import parse from './parsers.js';
import stringPrinting from './formatters/stylish.js';

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

const gendiff = (filepath1, filepath2) => {
  const obj1 = getFileData(filepath1);
  const obj2 = getFileData(filepath2);
  // return JSON.stringify(buildTree(obj1, obj2), null, '   ')
  return stringPrinting(buildTree(obj1, obj2));
};

export default gendiff;
