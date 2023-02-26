import React, { Component } from "react";

import "./App.css";
import Home from "./components/Home/Home";

const uploadImage = () => {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      image: null,
    };
  }

  render() {
    return (
      <div className="App">
        <Home uploadImage={uploadImage} image={this.state.image} />
      </div>
    );
  }
}

export default App;
