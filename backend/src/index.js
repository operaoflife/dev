const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.get('/api', (req, res) => {
  res.json({
    message: "Hello from backend!",
    environment: process.env.ENV || 'dev',
    timestamp: Date.now()
  })
})

app.listen(port, () => {
  console.log(`Backend running on port ${port}`)
})