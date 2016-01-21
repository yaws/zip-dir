/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'
import forEach from '@f/foreach'

/**
 * Zip a directory
 * @param  {String} dir
 * @return {Stream}
 */

function zipDir (dir, files) {
  return new Promise(function (resolve, reject) {
    let archive = archiver('zip')
    archive.on('error', reject)
    archive.pipe(concat(resolve))

    archive.directory(dir, false)

    forEach(function (source, name) {
      archive.file(source, {name: name})
    }, files)

    archive.finalize()
  })
}

/**
 * Exports
 */

export default zipDir
