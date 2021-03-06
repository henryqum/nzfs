const express = require('express')
var router = express.Router()

const fs = require('../src/filesystem')

router.get('/', (req, res) => {
  fs.list().then(
    (list) => {
      res.status(200).json(list)
    },
    (err) => {
      res.status(500).send(err.message)
    }
  )
})

router.route('/:set(*)/snapshots/:snap(*)')
  .get((req, res) => {
    let ds = req.params.set
    let snap = req.params.snap

    fs.get(`${ds}@${snap}`).then((info) => {
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
    console.log(body)
  })

router.get('/:set(*)', (req, res) => {
  let ds = req.params.set
  fs.list(ds).then((list) => {
    fs.get(ds).then((info) => {
      res.json(info)
    })
  }).catch((err) => {
    res.sendStatus(404)
  })
})

module.exports = router;
