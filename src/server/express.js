import express from 'express'
import webpack from 'webpack'

import configDevClient from '../../config/webpack.dev-client.js'
import configDevServer from '../../config/webpack.dev-server.js'
import configProdClient from '../../config/webpack.prod-client.js'
import configProdServer from '../../config/webpack.prod-server.js'

const server = express()

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer])
  const clientCompiler = compiler.compilers[0]
  const serverCompiler = compiler.compilers[1]

  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler, configDevClient.devServer
  )

  const webpackHotMiddleware = require('webpack-hot-middleware')(
    clientCompiler, configDevClient.devServer
  )

  server.use(webpackDevMiddleware)
  server.use(webpackHotMiddleware)
  console.log('All Middlewares are enabled')

} else {
  const render = require('./render.js')
  const staticMiddleware = express.static('dist')

  server.use(staticMiddleware)
  server.use(render())
}


server.listen(
  process.env.PORT || 8080,
  error => error
    ? console.error(`Server crashed - ${error}`)
    : console.info(`Server started - running at ${process.env.PORT}`)
)