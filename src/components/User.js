import React, { Component } from 'react'
import './User.css'

export default class User extends Component {
  static defaultProps = {
    userInfo: {
      name: 'Bob',
    }
  }

  render() {
    return (
      <div className="user">
        <ul>
          {
            Object.keys(this.props.userInfo).map((key, idx) => {
              return (
                <li key={idx}>
                  <code>
                    <b>{`${key}`}</b>
                    {`: ${this.props.userInfo[key]}`}
                  </code>
                </li>
              )
            })
          }
        </ul>

      </div>
    )
  }
}
