/**
 * Imports
 */

import archiver from 'archiver'
import concat from 'concat-stream'
import isFunction from '@f/is-function'
import isUndefined from '@f/is-undefined'
import isString from '@f/is-string'
import util from 'archiver-utils'

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
      let zip = new ArchiveWrap(archive)
      src(zip)
      zip.shouldFinalize && archive.finalize()
    } else {
      archive.directory(src, false)
      archive.finalize()
    }
  })
}

class ArchiveWrap {
  constructor (archive) {
    this.archive = archive
    this.shouldFinalize = true
  }

  directory (dir, dest) {
    dest = isUndefined(dest) ? false : dest
    this.archive.directory(dir, dest)
  }

  file (source, opts) {
    if (isString(opts)) {
      opts = {name: opts}
    }
    this.archive.file(source, opts)
  }

  append (source, opts) {
    if (isString(opts)) {
      opts = {name: opts}
    }
    this.archive.append(source, opts)
  }

  stream (stream) {
    this.shouldFinalize = false
    stream.on('data', (data) => {
      let source = data.content
      if (!source) {
        if (data.stats.isDirectory()) {
          source = new Buffer(0)
        } else {
          source = util.lazyReadStream(data.filepath)
        }
      }
      this.archive.append(source, {name: data.name, prefix: data.prefix, stats: data.stats})
    })
    stream.on('finish', () => this.archive.finalize())
  }
}

/**
 * Exports
 */

export default zipDir
