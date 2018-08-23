import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../components/app'

const server = express()

const webpack = require('webpack')
const config = require('../../config/webpack.dev.js')
const compiler = webpack(config)

const webpackDevMiddleware = require('webpack-dev-middleware')(
  compiler,
  config.devServer
)

const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

const staticMiddleware = express.static('dist')

/**
 * Middlewares needs to be placed in order:
 * 1. webpackDevMiddleware
 * 2. webpackHotMiddleware
 * 3. staticMiddleware
 */
server.use(webpackDevMiddleware)
server.use(webpackHotMiddleware)
server.use(staticMiddleware)

server.get('*', (req, res) => {
  res.send(`
<html>
  <head>
    <link href="main.css" rel="stylesheet" />
  </head>
  <body>
    <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
    <script src="vendors-bundle.js"></script>
    <script src="main-bundle.js"></script>
  </body>
</html>`)
})

server.listen(
  process.env.PORT || 8080,
  error => error
    ? console.error(`Server crashed - ${error}`)
    : console.info(`Server started - running at ${process.env.PORT}`)
)