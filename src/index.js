/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'
import isFunction from '@f/is-function'
import isUndefined from '@f/is-undefined'
import isString from '@f/is-string'

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
      let result  = src({
        directory: (dir, dest) => {
          dest = isUndefined(dest) ? false : dest
          archive.directory(dir, dest)
        },
        file: (source, opts) => {
          if (isString(opts)) {
            opts = {name: opts}
          }
          archive.file(source, opts)
        },
        append: (source, opts) => {
          if (isString(opts)) {
            opts = {name: opts}
          }
          archive.append(source,opts )
        }
      })
      if (result) {
        if (isPromise(result)) {
          result.then(() => archive.finalize())
        } else { // stream
          result.on('finish', () => archive.finalize())
        }
      } else {
        archive.finalize()
      }
    } else {
      archive.directory(src, false)
      archive.finalize()
    }


  })
}

/**
 * Exports
 */

export default zipDir
