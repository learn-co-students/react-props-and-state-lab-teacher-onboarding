import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  updateFilters = filterType => {
    const filters = { ...this.state.filters };
    filters.type = filterType;
    this.setState({ filters });
  };

  handleFindPetsClick = () => {
    const url =
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ pets: json }));
  };

  adoptPet = id => {
    console.log(this.state.pets);

    const pets = this.state.pets.map(e => {
      if (e.id === id) {
        e.isAdopted = true;
      }
      return e;
    });
    this.setState({ pets });
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
                onChangeType={this.updateFilters}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
