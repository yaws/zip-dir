/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'
import isFunction from '@f/is-function'
import isUndefined from '@f/is-undefined'

/**
 * Zip a directory
 * @param  {String} dir
 * @return {Stream}
 */

function zipDir (src) {
  return new Promise((resolve, reject) => {
    let archive = archiver('zip')
    archive.on('error', reject)
    archive.pipe(concat(resolve))

    if (isFunction(src)) {
      src({
        directory: (dir, dest) => {
          dest = isUndefined(dest) ? false : dest
          archive.directory(dir, dest)
        },
        file: (source, name) => {
          archive.file(source, {name: name})
        },
        append: (source, name) => {
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
