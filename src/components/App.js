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

  fetchPets = () => {
    let url = '/api/pets'
    if (this.state.filters.type !== 'all') {
      url += `?type=${this.state.filters.type}`
    };

    fetch(url)
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        this.setState({ pets: json });
      });

    
  };

  onChangeTypeCallback = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    });
  };

  onAdoptPetCallback = (petId) => {
    // console.log(petId);
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet;
    });
    this.setState({ pets: pets });
  };

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
                onFindPetsClick={this.fetchPets} 
                onChangeType={this.onChangeTypeCallback}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets} 
                onAdoptPet={this.onAdoptPetCallback} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
