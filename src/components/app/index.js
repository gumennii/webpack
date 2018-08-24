import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'

import Routes from '../../routes/index.js'

import styles from './styles.css'

class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <Router>
          <Routes />
        </Router>
      </div>
    )
  }
}

export default hot(module)(App)