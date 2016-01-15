/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'

/**
 * Zip a directory
 * @param  {String} dir
 * @return {Stream}
 */

function zipDir (dir) {
  return new Promise(function (resolve, reject) {
    let archive = archiver('zip')
    archive.on('error', reject)
    archive.directory(dir, false)
    archive.pipe(concat(resolve))
    archive.finalize()
  })
}

/**
 * Exports
 */

export default zipDir
