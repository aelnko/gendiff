#!/usr/bin/env node
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-console */
/* eslint-disable import/extensions */

import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .version('1.0')  
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(gendiff(filepath1, filepath2));
  });
program.parse();
