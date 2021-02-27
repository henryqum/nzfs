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

zfs.list().then((datasets) => {
  datasets.forEach((dataset) => {
    router.get(`/${dataset}`, (req, res) => {
      zfs.get(req.url.slice(1), req.query.p).then(
        (dataset_info) => {
          res.status(200).json(dataset_info)
        },
        (err) => {
          res.status(500).send(err.message)
        }
      )
    })
  })
})

module.exports = router;
