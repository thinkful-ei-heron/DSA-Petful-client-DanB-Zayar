import React, { Component } from 'react'
import './App.css';


export default class App extends Component {
  state = {
    testArray: null,
    binaryTestArray: null,
    message: null,
  }

  linearSearch(array, value) {

    let searches = 0
      for (let i = 0; i < array.length; i++) {
        searches += 1
        if (array[i] === parseInt(value)) {
          this.setState({
            message: `It took ${searches} searches to find`
          })
          return
        }
        else {
          this.setState({
            message: 'Unable to find value'
          })
        }
      }

  }

binarySearch(array, value, start, end, searches=1) {
  let newSearches = searches
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    console.log('item not found')
    return
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];


  if (item === value) {
    this.setState({ message: `It took ${newSearches} searches to find` })
    return
  }
  else if (item < value) {
    return this.binarySearch(array, value, index + 1, end, newSearches+1);
  }
  else if (item > value) {
    return this.binarySearch(array, value, start, index - 1, newSearches+1);
  }
};

  handleSearch = (formstate) => {
    this.setState({loading: true})
      .then(data => this.setState({
        resultsList: data.results
      }))
      .then(() => this.setState({ loading: false }))
      .catch(err=>console.log(err))
  }

  linearClick = (e) => {
    e.preventDefault();
    this.setState({
      message: null
    })
    let input = document.getElementById('input')
    this.linearSearch(this.state.testArray, parseInt(input.value))
  }

  binaryClick = (e) => {
    e.preventDefault();
    this.setState({
      message: null
    })
    let input = document.getElementById('input')
    this.binarySearch(this.state.binaryTestArray, parseInt(input.value))
  }

  componentDidMount() {
    const testArray = `89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5`.split(' ').map((num) => parseInt(num))
    this.setState({
      testArray
    }, () => {
        const array = testArray.slice(0)
        const binaryTestArray = array.sort((a, b) => a - b);

        this.setState({
          binaryTestArray
        });
    });

  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Binary vs Linear Search</h1>
        </header>
        <main className="main">
          <form className='binary-linear-search-form'>
          <fieldset name='search-value'>
            <label htmlFor='inputText'>Which Value Would You like to Search For?</label>
            <input id="input" type='text' name='inputText' placeholder='insert number here'></input>
          </fieldset>
          <button onClick={this.linearClick}>Linear</button>
          <button onClick={this.binaryClick}>Binary</button>
          </form>
          {this.state.message && <p>{this.state.message}</p>}

        </main>
      </div>
    )
  }
}
