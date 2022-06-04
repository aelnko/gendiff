/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturePath('file1r.json');
const file2 = getFixturePath('file2r.json');
const file1yml = getFixturePath('file1r.yaml');
const file2yml = getFixturePath('file2r.yml');

const expectedStylish = fs.readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectedPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');

test('gendiff', () => {
  expect(gendiff(file1, file2)).toBe(expectedStylish);
  expect(gendiff(file1yml, file2yml)).toBe(expectedStylish);
  expect(gendiff(file1, file2, 'plain')).toBe(expectedPlain);
  expect(gendiff(file1yml, file2yml, 'plain')).toBe(expectedPlain);
});
