import config from './config'
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
    petsList: [],
    usersList:[],
    petsQueue: null,
    userQueue: new Queue(),
    petsInQueue: 0,
    usersInQueue: 0,
    myQueuePosition: null,

    justAdopted: null,
    message: null,

  }


  fetchData() {
    let cats = []
    let dogs = []
    fetch(`${config.API_ENDPOINT}/api/cats`, {
      method: 'GET',
    })
      .then(resp => resp.json())
      .then(catData=>cats = catData)
      .then(() => {
        return fetch(`${config.API_ENDPOINT}/api/dogs`, {
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
      let catOrDog = Math.floor(Math.random() * 2)
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
      petsList: [...this.state.petsList, ...petsList]
    })
  }

  createUserQueue = () => {
    const usersList = [
      { name: 'Bob' },
      { name: 'Jim' },
      { name: 'Sarah' },
      { name: 'Jen' },
      { name: 'Amy' },
      { name: 'Bill' },
      { name: 'Sally' },
      { name: 'Sharon' },
    ]
    let newUsers = []
    for (let i = 0; i < 8; i++) {
      newUsers.push(usersList[i])
    }
    this.addUsersToQueue(newUsers)
  }

  addUsersToQueue = (newUsers) => {
    //adds a user to peopleList
    newUsers.forEach(user => {
      this.state.userQueue.enqueue(user)
    })
    this.setState({
      usersInQueue: newUsers.length + this.state.usersList.length,
      usersList: [...this.state.usersList, ...newUsers]
    })
  }

  matchPeopleToPet = (e) => {
    //dequeue from petsList
    if (this.state.myQueuePosition === 1) {
      return
    } else {
      if (this.state.petsQueue.first && this.state.userQueue.first) {
        let justAdopted = {
          person: this.state.userQueue.first,
          pet: this.state.petsQueue.first
        }
        this.state.userQueue.dequeue()
        this.state.petsQueue.dequeue()

        let newPets = this.state.petsList
        newPets.shift()

        let newUsers = this.state.usersList
        newUsers.shift()

        this.setState({
          justAdopted,
          usersInQueue: this.state.usersInQueue - 1,
          petsInQueue: this.state.petsInQueue - 1,
          petsList: [...newPets],
          usersList: [...newUsers],
        }, () => {
            if (this.state.petsList.length < 4) {
              this.createQueue()
            }
            if (this.state.usersInQueue < 6) {
              this.createUserQueue()
            }

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
        this.addUsersToQueue([{name: 'You'}])
    })
  }

  adoptClick = (e) => {
    let justAdopted = {
      person: this.state.userQueue.first,
      pet: this.state.petsQueue.first
    }
    this.state.userQueue.dequeue()
    this.state.petsQueue.dequeue()

    let newPets = this.state.petsList
    newPets.shift()

    let newUsers = this.state.usersList
    newUsers.shift()

    this.setState({
      justAdopted,
      usersInQueue: this.state.usersInQueue - 1,
      petsInQueue: this.state.petsInQueue - 1,
      petsList: [...newPets],
      usersList: [...newUsers],
    }, () => {
      if (this.state.petsList.length < 4) {
        this.createQueue()
      }
      if (this.state.usersInQueue < 6) {
        this.createUserQueue()
      }
        this.setState({
          myQueuePosition: null,
        })
    })

  }

  componentDidMount() {
    //api call to get a pet or multiple pets and add them to the list
    //create a list of people
    //start a timer that matches pets and people
   this.fetchData()
    setInterval(() => {
      if (this.state.countdown < 0) {
        this.matchPeopleToPet()
        this.setState({ countdown: 3 })
      } else {
        this.setState({ countdown: this.state.countdown - 1 })
      }
    }, 1000)

    // this.createUserQueue()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1>Pet Adoption Center</h1>
        </header>
        <main className="main">
          {this.state.myQueuePosition &&
            <p>Your queue position is {this.state.myQueuePosition}</p>
          }
          <form className='queueForm'>
            {this.state.myQueuePosition === 1 &&
              <button onClick={this.adoptClick}>It's your turn to adopt!</button>
            }
            {!this.state.myQueuePosition &&
              <button onClick={this.getinQueueClick}>Get in line to adopt!</button>
            }

          </form>
          {this.state.justAdopted &&
            <p>{
              `${this.state.justAdopted.person.data.name} just adopted ${this.state.justAdopted.pet.data.name}!!`
            }
            </p>}
          <section className="queues">
            <PetList petsList={this.state.petsList} />
            <UserList usersList={this.state.usersList} />
          </section>
        </main>
      </div>
    )
  }
}
