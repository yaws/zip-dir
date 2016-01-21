/**
 * Imports
 */

import test from 'tape'
import zipDir from '../src'
import concat from 'concat-stream'
import Zip from 'jszip'

/**
 * Tests
 */

test('should zip contents', (t) => {
  t.plan(1)
  zipDir(__dirname + '/fixtures/one-file').then(function (zipped) {
    let zip = new Zip(zipped, {compression: 'DEFLATE'})
    t.equal(zip.file('index.js').asText(), "module.exports = 'foo'\n")
  })
})

test('should zip contents and extra files', (t) => {
  t.plan(2)
  zipDir(__dirname + '/fixtures/one-file', {'main.js': __dirname + '/fixtures/files/main.js'}).then(function (zipped) {
    let zip = new Zip(zipped, {compression: 'DEFLATE'})
    t.equal(zip.file('index.js').asText(), "module.exports = 'foo'\n")
    t.equal(zip.file('main.js').asText(), "module.exports = 'bar'\n")
  })
})
