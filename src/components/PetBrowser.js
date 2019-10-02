import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const petCards = this.props.pets.map(pet => 
        <Pet 
          pet={pet} 
          key={pet.id}
          isAdopted={pet.isAdopted} 
          onAdoptPet={this.onAdoptPetCallback} 
        />
    )

    return (
      <div className="ui cards">{ petCards }</div>
    )
  }
}

export default PetBrowser
