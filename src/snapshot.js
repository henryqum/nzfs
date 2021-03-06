let zfs = require('./zfs')

async function create(filesystem, name) {
  return zfs.snapshot(`${filesystem}@${name}`)
} 

async function destroy(filesystem, name) {
  return zfs.destroy(`${filesystem}@${name}`)
}

module.exports.create = create
module.exports.destroy = destroy