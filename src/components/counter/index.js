import React from 'react'
import styled, { css } from 'react-emotion'

const color = 'blue'

// Example of usage emotion css
const className = css`
  color: ${color};
`

// Example of using react-emotion with props
const Paragraph = styled('p')`
  color: ${props => props.color === 'success' ? 'green' : color}
`

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
        <img src={require("../../assets/images/103815.jpg")} />
        <h2 className={className}>Counting: {this.state.count}</h2>
        <Paragraph color="success">Sample Text</Paragraph>
      </div>
    )
  }
}

export default Counter