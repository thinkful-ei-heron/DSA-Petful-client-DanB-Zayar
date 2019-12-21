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
    const { name, imageURL, imageDescription, sex, age, breed, story } = this.props.petInfo
    return (
      <div className="pet">
        <span>Name: {name}</span>
        <span>Breed: {breed}</span>
        <span>Age: {age}</span>
        <span>Sex: {sex}</span>
        <img className="image" src={imageURL} alt={imageDescription}/>
        <p>Story: {story}</p>
      </div>
    )
  }
}
