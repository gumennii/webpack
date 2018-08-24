import React from 'react'

import styles from '../../assets/styles/contact.css'

class Contact extends React.Component {
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
      <div onClick={this.handleClick} className={styles.contact}>
        <img src={require("../../assets/images/103815.jpg")} />
        <h2>Counting in Contact Page: {this.state.count}</h2>
        <p>Counter Starts from 5</p>
        <p>Contact Page</p>
      </div>
    )
  }
}

export default Contact