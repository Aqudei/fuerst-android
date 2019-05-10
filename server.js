const express = require('express')
const multer = require('multer')

const upload = multer({ dest: './uploads/' }).single('image')

const uploadPromise = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, err => {
      if (err) {
        console.error('\n uploadPromise ERR: ', err)
        reject(err)
      } else {
        resolve({ req, res })
      }
    })
  })
}

const port = 3333
const app = express()

app.get('/', (req, res) => res.json({ message: 'Hello, world!' }))

app.post('/upload', async (req, res) => {
  try {
    const result = await uploadPromise(req, res)
    const checksum = result.req.body.checksum
    const fileData = result.req.file

    if (!fileData) {
      console.error('No file info')
      return res.status(400).json({ message: 'File not processed' })
    }

    if (!checksum || (checksum && checksum.length === 0)) {
      console.error('Checksum is Required')
      return res.status(400).json({ message: 'Checksum is required' })
    }

    res.json({ ...fileData, checksum })

  } catch (err) {
    console.error('upload ERR: ', err)
    res.status(500).json({ message: err.message })
  }
})

app.listen(port, () => console.log(`Server listening on Port ${port}...`))