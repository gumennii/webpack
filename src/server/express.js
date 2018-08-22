import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { renderToString } from 'react-dom/server'
import Counter from '../counter.js'

const expressStaticGzip = require('express-static-gzip')
const server = express()

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

/** 
 * Run middlewares only in development mode 
 */
if (isDev) {
  const webpack = require('webpack')
  const config = require('../../config/webpack.dev.js')
  const compiler = webpack(config)
  // require('webpack-mild-compile')(compiler)

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
  console.log('Middleware Enabled')
} else {
  const Counter = require('../counter').default
  server.use(
    expressStaticGzip("dist", {
      enableBrotli: true
    })
  )
  server.get('*', (req, res) => {
    res.send(`
      <html>
        <head>
          <link href='./main.css' rel='stylesheet' />
        </head>
        <body>
          <div id='root'>
            ${renderToString(<Counter />)}
          </div>
          <script src='vendor-bundle.js'></script>
          <script src='main-bundle.js'></script>
        </body>
      </html>
    `)
  })
}

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`)
})