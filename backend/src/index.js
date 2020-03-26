const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
  .use(cors())
  .use(express.json())
  .use(routes)


app.listen(3333)