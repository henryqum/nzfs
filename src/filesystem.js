let zfs = require('./zfs')

async function list() {
  return zfs.list("", "filesystem")
}

async function get(name) {
  return zfs.get(name)
}

async function snapshots(name) {
  var list = await zfs.list(name, "snapshot")
  var modified = []

  list.map((i) => {
    modified.push(i.split('@')[1])
  })

  return modified
}

async function create(name) {
  return zfs.create(name)
}

async function destroy(name) {
  return zfs.destroy(name)
}

module.exports.get = get
module.exports.list = list
module.exports.snapshots = snapshots
module.exports.create = create
module.exports.destroy = destroy
