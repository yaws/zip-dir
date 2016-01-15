
# zip-dir

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Zip a directory.

## Installation

    $ npm install @yaws/zip-dir

## Usage

```js
var zipDir = require('@yaws/zip-dir')
var co = require('co')
var hash = require('hasha')

co(function * () {
  var code = yield zipDir('./')
  var hash = hasha(code, {alrogirthm: 'sha256'})
  s3.putObject({Bucket: 'code', Key: hash, Body: code})
})

```

## API

### zipDir(dir)

- `dir` - directory to zip

**Returns:** a readable stream of the zipped contents of the directory

## License

MIT

[travis-image]: https://img.shields.io/travis/yaws/zip-dir.svg?style=flat-square
[travis-url]: https://travis-ci.org/yaws/zip-dir
[git-image]: https://img.shields.io/github/tag/yaws/zip-dir.svg
[git-url]: https://github.com/yaws/zip-dir
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/@yaws/zip-dir.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@yaws/zip-dir
