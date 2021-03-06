const express = require('express')
var router = express.Router()

const fs = require('../src/filesystem')
const snap = require('../src/snapshot')

router.use(express.json())

router.route('/')
  .get((req, res) => {
    fs.list().then(
      (list) => {
        res.status(200).json(list)
      },
      (err) => {
        res.status(500).send(err.message)
      }
    )
  })
  .post((req, res) => {
    let name = req.body.name
    fs.create(name).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(400)
    })
  })

router.route('/:set(*)/snapshots/:snapshot(*)')
  .get((req, res) => {
    let ds = req.params.set
    let snapshot = req.params.snapshot

    fs.get(`${ds}@${snapshot}`).then((info) => {
      console.log("success")
      res.status(200).json(info)
    }).catch((err) => {
      console.log("failed")
      res.status(404).json({
        error: true,
        message: `Could not find snapshot "${snapshot}"`
      })
    })
  })
  .delete((req, res) => {
    let ds = req.params.set
    let snapshot = req.params.snapshot

    snap.destroy(ds, snapshot).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      console.log(`failed to delete ${ds}@${snapshot}: ${err.message}`)
      res.sendStatus(400)
    })
  })

router.route('/:set(*)/snapshots')
  .get((req, res) => {
    let ds = req.params.set
    fs.snapshots().then((list) => {
      res.json(list)
    }).catch((err) => {
      res.sendStatus(404)
    })
  })
  .post((req, res) => {
    let ds = req.params.set
    let body = req.body
    
    snap.create(ds, body.name).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      res.sendStatus(400)
    })
  })

router.route('/:set(*)')
  .get((req, res) => {
    let ds = req.params.set
    fs.list(ds).then((list) => {
      fs.get(ds).then((info) => {
        res.json(info)
      })
    }).catch((err) => {
      res.sendStatus(404)
    })
  })
  .delete((req, res) => {
    let ds = req.params.set
    fs.destroy(ds).then(() => {
      res.sendStatus(200)
    }).catch((err) => {
      console.log(`failed deleting fs: ${err.message}`)
      res.sendStatus(400)
    })
  })

module.exports = router;
