### Hexlet tests and linter status:
[![Actions Status](https://github.com/aelnko/gendiff/workflows/hexlet-check/badge.svg)](https://github.com/aelnko/gendiff/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/1c13612d246a82d15997/maintainability)](https://codeclimate.com/github/aelnko/frontend-project-lvl2/maintainability)
[![ESlint](https://github.com/aelnko/gendiff/actions/workflows/eslint.yml/badge.svg)](https://github.com/aelnko/frontend-project-lvl2/actions/workflows/eslint.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1c13612d246a82d15997/test_coverage)](https://codeclimate.com/github/aelnko/frontend-project-lvl2/test_coverage)



## Установка
Для установки утилиты выполните следующие команды:
```bash
git clone git@github.com:aelnko/gendiff.git
cd gendiff
npm ci
npm link
```
Для получения справочной информации об утилите введите команду:
```bash
gendiff -h
```
[![Install](https://asciinema.org/a/507619.svg)](https://asciinema.org/a/507619)


## Сравнение двух библиотек
Для этого выполните команду:
```bash
gendiff file1.json file2.json
```
или:
```bash
gendiff file1r.json file2r.json
```
[![Install](https://asciinema.org/a/507622.svg)](https://asciinema.org/a/507622)

## Сравнение в плоском формате
Для этого выполните команду:
```bash
gendiff -f plain file1r.json file2r.json
```
[![Install](https://asciinema.org/a/507623.svg)](https://asciinema.org/a/507623)