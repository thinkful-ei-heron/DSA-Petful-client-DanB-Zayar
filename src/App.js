import React, { Component } from 'react'
import './App.css';
import PetList from './components/PetList'
import UserList from './components/UserList'
import Queue from './components/Queue'


export default class App extends Component {
  state = {
    countdown: 3,
    loaded: false,
    catsList: [],
    dogsList: [],
    petsQueue: null,
    petsInQueue: 0,
    usersInQueue: 0,
    myQueuePosition: null,
    petsList: [],
    usersList: [
      { name: 'Bob' },
      { name: 'Jim' },
      { name: 'Sarah' },
      { name: 'Jen' },
      { name: 'Amy' },
      { name: 'Bill' },
      { name: 'Sally' },
      { name: 'Sharon' },
    ],
    justAdopted: null,
    message: null,

  }



  fetchData() {
    let cats = []
    let dogs = []
    fetch(`http://localhost:8080/api/cats`, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(catData=>cats = catData)
      .then(() => {
        return fetch(`http://localhost:8080/api/dogs`, {
          method: 'GET',
        })
      })
      .then(resp => resp.json())
      .then(dogData => dogs = dogData)
      .then(() => {
        this.setState({
          loaded: true,
          catsList: cats,
          dogsList: dogs,
        }, () => {
            this.createQueue()
            this.createUserQueue()
        })
      })

  }

  createQueue = () => {
    //create queue from randomly selecting a dog or a cat from list
    let petsList = []
    for (let i = 0; i < 3; i++){
      let catOrDog = Math.floor(Math.random() * 1)
      if (catOrDog === 0) {
        petsList.push(this.state.dogsList[i])
      } else {
        petsList.push(this.state.catsList[i])
      }
    }
    this.addPetsToQueue(petsList)
  }

  addPetsToQueue = (petsList) => {
    let newPetsQueue = new Queue()
    petsList.forEach(pet => {
      newPetsQueue.enqueue(pet)
    })
    this.setState({
      petsInQueue: petsList.length,
      petsQueue: newPetsQueue,
      petsList: [...petsList]
    })
  }

  createUserQueue = () => {
    let userList = []
    for (let i = 0; i < 2; i++) {
      userList.push(this.state.usersList[i])
    }
    this.addUsersToQueue(userList)
  }

  addUsersToQueue = (userList) => {
    //adds a user to peopleList
    let newUsersQueue = new Queue()
    userList.forEach(user => {
      newUsersQueue.enqueue(user)
    })
    this.setState({
      usersInQueue: userList.length,
      userQueue: newUsersQueue,
      usersList: [...userList]
    }, () => {
        setInterval(() => {
          if (this.state.countdown < 0) {
            this.matchPeopleToPet()
            this.setState({ countdown: 3 })
          } else {
            this.setState({ countdown: this.state.countdown - 1 })
          }
        }, 1000)
    })
  }

  matchPeopleToPet = (e) => {
    //dequeue from petsList
    if (this.state.myQueuePosition === 1) {
      return
    } else {
      if (this.state.petsQueue.first && this.state.userQueue.first) {
        console.log('matching')

        let justAdopted = {
          person: this.state.userQueue.first,
          pet: this.state.petsQueue.first
        }
        this.state.userQueue.dequeue()
        this.state.petsQueue.dequeue()

        let petIndex = this.state.petsList.findIndex(pet => pet.name === justAdopted.pet.name)
        let newPets = this.state.petsList
        newPets.shift()

        let userIndex = this.state.usersList.findIndex(user => user === justAdopted.person.name)
        let newUsers = this.state.usersList
        newUsers.shift()

        this.setState({
          justAdopted,
          usersInQueue: this.state.usersInQueue - 1,
          petsInQueue: this.state.petsInQueue - 1,
          petsList: [...newPets],
          usersList: [...newUsers],
        }, () => {
          if (this.state.myQueuePosition > 1)
            this.setState({
              myQueuePosition: this.state.myQueuePosition - 1,
            })
        })

      }
    }

  }



  getinQueueClick = (e) => {
    e.preventDefault();
    this.setState({
      message: 'You are now in the queue',
      myQueuePosition: this.state.usersInQueue + 1,
    }, () => {
        this.addUsersToQueue([...this.state.usersList, {name: 'You'}])
    })
  }

  adoptClick = (e) => {
    e.preventDefault();
    this.setState({
      message: null
    })

  }

  componentDidMount() {
    //api call to get a pet or multiple pets and add them to the list
    //create a list of people
    //start a timer that matches pets and people
   this.fetchData()

    // this.createUserQueue()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Adoption Center</h1>
        </header>
        <main className="main">
          {this.state.justAdopted &&
            <p>{
              `${this.state.justAdopted.person.data.name} has just adopted ${this.state.justAdopted.pet.data.name}!!`
            }
            </p>}
          <section className="queues">
            <PetList petsList={this.state.petsList} />
            <UserList usersList={this.state.usersList} />
          </section>

          <form className='queueForm'>
            {this.state.myQueuePosition === 1 &&
              <button onClick={this.adoptClick}>It's your turn to adopt!</button>
            }
            {!this.state.myQueuePosition &&
              <button onClick={this.getinQueueClick}>Get in line to adopt!</button>
            }

          </form>


        </main>
      </div>
    )
  }
}
