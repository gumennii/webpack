import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux' 

import store from '../store'
import Routes from '../routes'

import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

export default ({ clientStats }) => (req, res) => {

  const app = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={{}}>
        <Routes />
      </StaticRouter>
    </Provider>
  )

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  })

  res.send(`
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div id="root">${app}</div>
        ${js}
        ${cssHash}
      </body>
    </html>
  `)
}