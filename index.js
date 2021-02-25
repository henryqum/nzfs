const express = require('express')
const app = express()
const port = 3000

const zfs = require('./src/zfs');
const dataset = require('./src/dataset');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/datasets', (req, res) => {
  zfs.getDatasets().then((data) => {
    res.json(data);
  },
  (err) => {
    console.log("[ERROR] Problem getting datasets");
  });
})

app.get('/datasets/:dataset', (req, res) => {
  dataset.getData(req.params.dataset).then((data) => {
    res.json(data);
  },
  (err) => {
    console.log(`[ERROR] Problem getting info for dataset ${req.params.dataset}`);
  });
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})