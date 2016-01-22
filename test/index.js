/**
 * Imports
 */

import test from 'tape'
import zipDir from '../src'
import concat from 'concat-stream'
import Zip from 'jszip'
import fs from 'fs'

/**
 * Tests
 */

test('should zip from dir', (t) => {
  t.plan(1)
  zipDir(__dirname + '/fixtures/one-file').then(function (zipped) {
    let zip = new Zip(zipped, {compression: 'DEFLATE'})
    t.equal(zip.file('index.js').asText(), "module.exports = 'foo'\n")
  })
})

test('should zip contents defined by function', (t) => {
  t.plan(3)

  zipDir(contents).then(function (zipped) {
    let zip = new Zip(zipped, {compression: 'DEFLATE'})
    t.equal(zip.file('index.js').asText(), "module.exports = 'foo'\n")
    t.equal(zip.file('main.js').asText(), "module.exports = 'bar'\n")
    t.equal(zip.file('main2.js').asText(), "module.exports = 'bar'\n")
  })

  function contents (zip) {
    zip.directory(__dirname + '/fixtures/one-file')
    zip.file(__dirname + '/fixtures/files/main.js', 'main.js')
    zip.append(fs.createReadStream(__dirname + '/fixtures/files/main.js'), 'main2.js')
  }

})
