import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  render() {
    return (
      <div className="ui cards">
        <ul>
          {this.props.pets.map(e => (
            <Pet key={e.id} onAdoptPet={this.props.onAdoptPet} pet={e}></Pet>
          ))}
        </ul>
      </div>
    );
  }
}

export default PetBrowser;
