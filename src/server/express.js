import express from 'express'

const server = express()

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

const staticMiddleware = express.static('dist')

server.use(staticMiddleware)

server.listen(
  process.env.PORT || 8080,
  error => error
    ? console.error(`Server crashed - ${error}`)
    : console.info(`Server started - running at ${process.env.PORT}`)
)