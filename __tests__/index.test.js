/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff, { getFileData } from '../src/index.js';
import buildTree from '../src/buildAST.js';
import stringPrinting from '../src/formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file1yml = getFixturePath('file1.yaml');
const file2yml = getFixturePath('file2.yml');

const expectedStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');

test('gendiff', () => {
  expect(gendiff(file1, file2)).toBe(expectedStylish);
  expect(gendiff(file1yml, file2yml)).toBe(expectedStylish);
});

// const dataJson1 = {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false,
// };

// const dataYaml1 = {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false,
// };

// const objToTree = {
//   'group1': {
//     'baz': 'bas',
//     'foo': 'bar',
//     'nest': {
//       'key': 'value',
//     },
//   },
// };

// const obj2ToTree = {
//   'group1': {
//     'foo': 'bar',
//     'baz': 'bars',
//     'nest': 'str',
//   },
// };

// const expectedTree = '{\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n}';

// test('gendiff', () => {
//   expect(gendiff(file1, file2)).toEqual(expectedStylish);
// });

// test('format', () => {
//   expect(getFileData(file1, '.json')).toEqual(dataJson1);
//   expect(getFileData(file1Yaml, '.yaml')).toEqual(dataYaml1);
//   expect(getFileData(file1Yaml, '.yml')).toEqual(dataYaml1);
// });

// test('formatter', () => {
//   expect(stringPrinting(buildTree(objToTree, obj2ToTree))).toEqual(expectedTree);
// });


