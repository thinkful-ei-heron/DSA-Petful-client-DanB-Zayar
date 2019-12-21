import React, { Component } from 'react'
import './PetList.css'
// import DataContext from '../DataContext'
import Pet from './Pet'

export default class PetList extends Component {
  static defaultProps = {
    petsList: []
  }

  render() {
    if (this.props.petsList.length > 0) {
      return (
        <div className="petsList">
          {this.props.petsList.map((pet, idx) => {
            return (
              <>
                {(idx === 0) &&
                  <Pet key={idx} id={`pet-${idx}`} petInfo={pet} />
                }
                {(idx !== 0) &&
                  <Pet key={idx} id={`pet-${idx}`} petInfo={pet} />
                }
              </>
            )
          })}

        </div>
      )
    } else {
      return (
        <p>No pets to display</p>
      )
    }

  }
}
