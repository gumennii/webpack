import express from 'express'
import path from 'path'

const server = express()

const isProd = process.env.NODE_ENV === "production"

/** 
 * Run middlewares only in development mode 
 */
if (!isProd) {
  const webpack = require('webpack')
  const config = require('../../config/webpack.dev.js')
  const compiler = webpack(config)

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  )

  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

  /**
   * Middlewares needs to be placed in order:
   * 1. webpackDevMiddleware
   * 2. webpackHotMiddleware
   * 3. staticMiddleware
   */
  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddleware)
}

const staticMiddleware = express.static('dist')

// Handle gzip in express
const expressStaticGzip = require('express-static-gzip')
server.use(expressStaticGzip('dist'))
// server.use(staticMiddleware)

server.listen(8080, () => {
  console.log('Server is listening...')
})