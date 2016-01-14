/**
 * Imports
 */

import archiver from 'archiver'
import glob from 'glob'
import path from 'path'
import fs from 'fs'


/**
 * Zip a directory
 * @param  {String} dir
 * @return {Stream}
 */

function zipDir (dir) {
  let archive = archiver('zip')
  archive.directory(dir, false)
  setTimeout(function () {
    archive.finalize()
  })
  return archive
}

/**
 * Exports
 */

export default zipDir
