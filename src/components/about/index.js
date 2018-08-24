import React from 'react'

import '../../assets/styles/about.css'

class About extends React.Component {
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
        <img src={require("../../assets/images/103815.jpg")} />
        <h2>Counting in About Page: {this.state.count}</h2>
        <p color="success">About Page</p>
      </div>
    )
  }
}

export default About