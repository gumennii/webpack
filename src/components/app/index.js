import React from 'react'
import { hot } from 'react-hot-loader'

import Counter from '../counter/index.js'

class App extends React.Component {
  render() {
    return (
      <Counter />
    )
  }
}

export default hot(module)(App)