/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'
import isFunction from '@f/is-function'

/**
 * Zip a directory
 * @param  {String} dir
 * @return {Stream}
 */

function zipDir (src) {
  return new Promise(function (resolve, reject) {
    let archive = archiver('zip')
    archive.on('error', reject)
    archive.pipe(concat(resolve))

    if (isFunction(src)) {
      src({
        directory: function (dir) {
          archive.directory(dir, false)
        },
        file: function (source, name) {
          archive.file(source, {name: name})
        },
        append: function (source, name) {
          archive.append(source, {name: name})
        }
      })
    } else {
      archive.directory(src, false)
    }

    archive.finalize()
  })
}

/**
 * Exports
 */

export default zipDir
