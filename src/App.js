import React, { Component } from 'react'
import './App.css';
import PetList from './components/PetList'
import UserList from './components/UserList'
import Queue from './components/Queue'


export default class App extends Component {
  state = {

    petsQueue: new Queue(),
    petsInQueue: 0,
    userQueue: new Queue(),
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
  catsList = []
  dogsList = []


  createQueue = () => {
    //create queue from randomly selecting a dog or a cat from list
    for (let i = 0; i < 5; i++){
      let catOrDog = Math.floor(Math.random() * 1)
      if (catOrDog === 0) {
        this.addPetToQueue(this.dogsList[i])
      } else {
        this.addPetToQueue(this.catsList[i])
      }
    }
  }

  addPetToQueue = (pet) => {
    //adds random cat or dog to queue
    this.state.petsQueue.enqueue(pet)
    this.setState({
      petsInQueue: this.state.petsInQueue + 1,
      petsList: [...this.state.petsList, pet]
    })
  }

  createUserQueue = () => {
    for (let i = 0; i < 5; i++) {
        this.addUserToQueue(this.usersList[i])
      }
  }

  addUserToQueue = (user) => {
    //adds a user to peopleList
    this.state.userQueue.enqueue(user)
    this.setState({
      usersInQueue: this.state.usersInQueue + 1,
      usersList: [...this.state.usersList, user]
    })
  }

  matchPeopleToPet = (e) => {
    //dequeue from petsList
    if (this.state.petsQueue.first && this.state.userQueue.first) {
      if (!this.state.myQueuePosition === 1) {
        let justAdopted = {
          person: this.state.userQueue.dequeue(),
          pet: this.state.petsQueue.dequeue(),
        }

        let petIndex = this.state.petsList.findIndex(pet => pet.name === justAdopted.pet.name)
        let newPets = this.state.petsList.slice(petIndex, 1)

        let userIndex = this.state.usersList.findIndex(user => user === justAdopted.person)
        let newUsers = this.state.usersList.slice(userIndex, 1)

        this.setState({
          justAdopted,
          usersInQueue: this.state.usersInQueue - 1,
          petsInQueue: this.state.petsInQueue - 1,
          petsList: newPets,
          usersList: newUsers,
        }, () => {
            if (this.state.myQueuePosition > 1)
            this.setState({
              myQueuePosition: this.state.myQueuePosition - 1,
            }, () => {
                setTimeout(this.matchPeopleToPet, 3000)
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
        this.addUserToQueue({ name: 'You' })
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
              `${this.state.justAdopted.person.name} has just adopted ${this.state.justAdopted.pet.name}!!`
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
            <button onClick={this.getinQueueClick}>Get in line to adopt!</button>
          </form>


        </main>
      </div>
    )
  }
}
