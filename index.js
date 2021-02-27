const express = require('express')
const app = express()
const port = 3000

const dataset = require('./src/dataset')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/datasets', dataset)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})