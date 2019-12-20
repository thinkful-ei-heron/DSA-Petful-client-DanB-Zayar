import React, { Component } from 'react'
import DataContext from '../DataContext'
import Result from './Result'

export default class ResultsList extends Component {
  static contextType = DataContext
  render() {
    if (this.context.resultsList.length > 0) {
      return (
        <div className="resultslist">
          {this.context.resultsList.map(item => {
            return (<Result item={item} />)
          })}

        </div>
      )
    } else {
      return (
        <p>No Results to Display</p>
      )
    }

  }
}
