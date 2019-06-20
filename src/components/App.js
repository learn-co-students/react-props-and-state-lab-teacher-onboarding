import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = type => {
    this.setState(state => {
      state.filters.type = type
      return state
    })
  }

  buildQueryString = type => {
    const dictionary = {
      micropig: "?type=micropig",
      cat: "?type=cat",
      dog: "?type=dog",
      all: ""
    }
    return dictionary[type]
  }

  findPets = () => {
    const url = `/api/pets${this.buildQueryString(this.state.filters.type)}`
    fetch(url)
      .then(response => response.json())
      .then(pets => {
        this.setState(state => {
          state.pets = pets
          return state
        })
      })
  }

  adoptPet = id => {
    const pet = this.state.pets.find(pet => pet.id == id)
    pet.isAdopted = true
    this.setState(state => {
      return state
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.changeType}
                onFindPetsClick={this.findPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.adoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
