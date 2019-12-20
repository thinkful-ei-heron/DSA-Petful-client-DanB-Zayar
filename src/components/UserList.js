import React, { Component } from 'react'
import './UserList.css'
// import DataContext from '../DataContext'
import User from './User'

export default class UserList extends Component {
  static defaultProps = {
    usersList: []
  }

  render() {
    if (this.props.usersList.length > 0) {
      return (
        <div className="usersList">
          {this.props.usersList.map((user, idx) => {
            return (<User key={idx} id={`user-${idx}`} userInfo={user} />)
          })}

        </div>
      )
    } else {
      return (
        <p>No users to display</p>
      )
    }

  }
}
