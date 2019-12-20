import React, { Component } from 'react'
import './Pet.css'

export default class Pet extends Component {
  static defaultProps = {
    petInfo: {
      imageURL: 'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
      imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
      name: 'Fluffy',
      sex: 'Female',
      age: 2,
      breed: 'Bengal',
      story: 'Thrown on the street',
    }
  }

  render() {
    return (
      <div className="pet">
        <ul>
          {
            Object.keys(this.props.petInfo).map((key, idx) => {
                return (
                  <li>
                    <code>
                      <b>{`${key}`}</b>
                      {`: ${this.props.petInfo[key]}`}
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
