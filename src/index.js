import fs from 'fs';
import path from 'path';
import buildTree from './buildAST.js';

const getFileData = (filepath) => {
  filepath = String(filepath);
  const data = JSON.parse(fs.readFileSync(path.resolve('__fixtures__', filepath)));
  const format = path.extname(filepath);
  return data;
}

const stringPrinting = (array) => {
  const flatArr = array.flat();
  let result = '{';
  for (const item of flatArr) {
    if (item.type === 'removed') {
      result += `\n  - ${item.key}: ${item.value}`;
    }
    if (item.type === 'added') {
      result += `\n  + ${item.key}: ${item.value}`;
    }
    if (item.type === 'none') {
      result += `\n    ${item.key}: ${item.value}`;
    }
  }
  result += '\n}';
  return result;
}

const gendiff = (filepath1, filepath2) => {
  const obj1 = getFileData(filepath1);
  const obj2 = getFileData(filepath2);
  return stringPrinting(buildTree(obj1, obj2));
}

export default gendiff;
