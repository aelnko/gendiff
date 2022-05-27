/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff, { getFileData } from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');
const file1Yaml = getFixturePath('file1.yaml');

const dataJson1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const dataYaml1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

test('gendiffJSON', () => {
  expect(gendiff(file1, file2)).toEqual('{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}');
  expect(gendiff(file2, file1)).toEqual('{\n  + follow: false\n    host: hexlet.io\n  + proxy: 123.234.53.22\n  - timeout: 20\n  + timeout: 50\n  - verbose: true\n}');
});

test('formatter', () => {
  expect(getFileData(file1, '.json')).toEqual(dataJson1);
  expect(getFileData(file1Yaml, '.yaml')).toEqual(dataYaml1);
  expect(getFileData(file1Yaml, '.yml')).toEqual(dataYaml1);
});
