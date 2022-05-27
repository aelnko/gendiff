import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
// eslint-disable-next-line import/extensions
import buildTree from './buildAST.js';

const getFormat = (filepath) => {
  const format = path.extname(filepath);
  return format;
};

export const getFileData = (filepath, format) => {
  const stringFilepath = String(filepath);
  if (format === '.json') {
    const data = JSON.parse(fs.readFileSync(path.resolve('__fixtures__', stringFilepath)));
    return data;
  }
  if (format === '.yml' || format === '.yaml') {
    const data = yaml.load(fs.readFileSync(path.resolve('__fixtures__', stringFilepath)));
    return data;
  }
  return null;
};

const stringPrinting = (array) => {
  const flatArr = array.flat();
  let result = '{';
  for (let i = 0; i < flatArr.length; i += 1) {
    if (flatArr[i].type === 'removed') {
      result += `\n  - ${flatArr[i].key}: ${flatArr[i].value}`;
    }
    if (flatArr[i].type === 'added') {
      result += `\n  + ${flatArr[i].key}: ${flatArr[i].value}`;
    }
    if (flatArr[i].type === 'none') {
      result += `\n    ${flatArr[i].key}: ${flatArr[i].value}`;
    }
  }
  result += '\n}';
  return result;
};

const gendiff = (filepath1, filepath2) => {
  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);
  const obj1 = getFileData(filepath1, format1);
  const obj2 = getFileData(filepath2, format2);
  return stringPrinting(buildTree(obj1, obj2));
};

export default gendiff;
