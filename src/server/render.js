import React from 'react'
import { renderToString } from 'react-dom/server'

const App = require("../components/app").default

export default () => (req, res) => {
  res.send(`
  <html>
    <head>
      <link href="main.css" rel="stylesheet" />
    </head>
    <body>
      <div id="root">${renderToString(<App />)}</div>
      <script src="vendors-bundle.js"></script>
      <script src="main-bundle.js"></script>
    </body>
  </html>`)
}