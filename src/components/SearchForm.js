import React, { Component } from 'react'
import DataContext from '../DataContext'

export default class SearchForm extends Component {
  static contextType = DataContext
  state = {
    type: 'people',
    query: ''
  }

  handleQuery(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleTypeSelect(event) {
    this.setState({
      type: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSearch(this.state)
  }

  render() {
    return (
      <>
        <div className="searchform">
          <form id="searchform" onSubmit={(e)=>this.handleSubmit(e)}>
            <label className="searchtype">Select Type
              <select name="type" defaultValue="people"
                onChange={(e) => this.handleTypeSelect(e)}>

                <option value="people">People</option>
                <option value="films">Films</option>
                <option value="planets">Planets</option>
                <option value="species">Species</option>
                <option value="starships">Starships</option>
                <option value="vehicles">Vehicles</option>
              </select>
            </label>
            <label className="searchquery">
              <input name="query" type="text" onChange={(e)=>this.handleQuery(e)} placeholder={`Search for ${this.state.type}...`}></input>
            </label>
            <button type="submit">Search</button>
          </form>
        </div>
      </>
    )
  }
}
