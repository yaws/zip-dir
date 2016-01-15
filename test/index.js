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
