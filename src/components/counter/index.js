import React from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
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
        <h2>Counting: {this.state.count}</h2>
      </div>
    )
  }
}

export default Counter