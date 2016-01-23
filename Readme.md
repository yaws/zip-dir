
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
  var hash = hasha(code, {encoding: 'base64', alrogirthm: 'sha256'})
  s3.putObject({Bucket: 'code', Key: hash, Body: code})
})

// or

co(function * () {
  var code = yield zipDir(content)
  var hash = hasha(code, {encoding: 'base64', alrogirthm: 'sha256'})
  s3.putObject({Bucket: 'code', Key: hash, Body: code})
})

function content (zip) {
  zip.directory('./')
  zip.append('{"USER": "josh"}', '.env.json')
}

```

## API

### zipDir(src)

- `src` {String} - Path to the directory to zip.
- `src` {Function} - The function defines the sources using the zip api that is passed to it. The functions signature is `src(zip)`. `zip` has three methods:
    - `directory(path, dest)`
    - `file(path, opts|name)`
    - `append(src, opts|name)`

**Returns:** a promise for a buffer of the zipped contents

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
