import React, { Component } from 'react'

export default class Result extends Component {
  render() {
    return (
      <div className="result">
        <ul>
          {
            Object.keys(this.props.item).map((key, idx) => {
              if (typeof this.props.item[key] == 'string') {
                return (
                  <li>
                    <code>
                      <b>{`${key}`}</b>
                      {`: ${this.props.item[key]}`}
                    </code>
                  </li>
                )
              }

            })
          }
        </ul>

      </div>
    )
  }
}
