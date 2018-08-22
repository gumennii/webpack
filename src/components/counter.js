import React, { Component } from 'react'

import styles from './counter'

class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 5
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <h2 className={styles.heading}>Counting!: {this.state.count}</h2>
      </div>
    )
  }
}

export default Counter