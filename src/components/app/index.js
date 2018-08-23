import React from 'react'
import { hot } from 'react-hot-loader'

import Counter from '../counter/index.js'

// import styles from './styles.css'

class App extends React.Component {
  render() {
    return (
      <div>
        <Counter />
      </div>
    )
  }
}

export default hot(module)(App)