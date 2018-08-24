import express from 'express'
import webpack from 'webpack'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'

import configDevClient from '../../config/webpack.dev-client.js'
import configDevServer from '../../config/webpack.dev-server.js'
import configProdClient from '../../config/webpack.prod-client.js'
import configProdServer from '../../config/webpack.prod-server.js'

const expressStaticGzip = require('express-static-gzip')
const server = express()

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

server.get('/json', (req, res) => {
  res.json({
    app: 'test',
    content: 'content',
    author: 'Misha'
  })
})

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer])

  const clientCompiler = compiler.compilers[0]
  const serverCompiler = compiler.compilers[1]

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    configDevClient.devServer
  )

  const webpackHotMiddleware = require('webpack-hot-middleware')(
    clientCompiler,
    configDevClient.devServer
  )

  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddleware)
  server.use(webpackHotServerMiddleware(compiler))
  console.log('Middleware enabled')
  
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    console.log(
      stats.toString({
        colors: true
      })
    )
    const clientStats = stats.toJson().children[0]
    const render = require('../../build/prod-server-bundle.js').default
    server.use(
      expressStaticGzip('dist', {
        enableBrotli: true
      })
    )
    server.use(render({ clientStats }))
  })
}

const PORT = 8080
server.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
  )
})