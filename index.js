const express = require('express')
const app = express()
const port = 3000

const filesystemRouter = require('./routers/filesystem')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/filesystems', filesystemRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})