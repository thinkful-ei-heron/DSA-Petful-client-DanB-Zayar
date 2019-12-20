import React, { Component } from 'react'

const DataContext = React.createContext()

export default DataContext

export class DataContext extends Component {
  state = {
    pets: [],
    people: [],
    queuePosition: null,
  }


  render() {
    const value = {
      pets: this.state.pets,
      people: this.state.people,
      queuePosition: this.state.queuePosition,
    }
    return (
      <DataContext.Provider value={value}>
        {this.props.children}
      </DataContext.Provider>
    )
  }
}
