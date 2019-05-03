const fs = require('fs')
const http = require('http')
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/static', express.static(path.join(__dirname, 'static/')))
app.set('port', PORT)

app.use('/', express.static('../frontend-test/build'))

const staticServer = http.createServer(app)
staticServer.listen(PORT)

const routes = fs.readdirSync('./routes')
routes.forEach(routeStr => {
  let routeName = routeStr.slice(0, -3)
  let route = require('./routes/' + routeName)
  app.use('/api/' + routeName, route)
})

staticServer.on('listening', () => {
  console.log(`server is running on port ${PORT}`)
})
