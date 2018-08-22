import React, { Component } from 'react'
import { hot } from 'react-hot-loader'

import Counter from './counter'

class App extends Component {
  render() {
    return <Counter />
  }
}

export default hot(module)(App)