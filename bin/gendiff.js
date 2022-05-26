#!/usr/bin/env node

import { program } from 'commander';

program
  .version('1.0')  
  .argument('<filepath1>')
  .argument('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  
  program.parse();