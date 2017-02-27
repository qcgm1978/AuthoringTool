import React, { Component } from 'react'

class Calendar extends Component {
  render() {
    const events = [
      { id: 0, title: 'essay due' }
    ]

    return (
      <div>
        <h2>Group</h2>
        <div style={{ padding: 20 }}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

module.exports = Calendar
