const express = require('express')
var router = express.Router()

const zfs = require('./zfs')

router.get('/', (req, res) => {
  zfs.list().then(
    (list) => {
      res.status(200).json(list)
    },
    (err) => {
      res.status(500).send(err.message)
    }
  )
})

router.get('/:set(*)/snapshots/:snap(*)', (req, res) => {
  let ds = req.params.set
  let snap = req.params.snap

  zfs.get(`${ds}@${snap}`).then((info) => {
    console.log("success")
    res.status(200).json(info)
  }).catch((err) => {
    console.log("failed")
    res.status(404).json({
      error: true,
      message: `Could not find snapshot "${snap}"`
    })
  })
})

router.get('/:set(*)/snapshots', (req, res) => {
  let ds = req.params.set

  zfs.list(ds, "snapshot").then((list) => {
    var modified = []
    list.map((s) => {
      modified.push(s.split('@')[1])
    })
    res.json(modified)
  }).catch((err) => {
    res.sendStatus(404)
  })
})

router.get('/:set(*)', (req, res) => {
  let ds = req.params.set
  zfs.list(ds).then((list) => {
    zfs.get(ds).then((info) => {
      res.json(info)
    })
  }).catch((err) => {
    res.sendStatus(404)
  })
})

module.exports = router;
