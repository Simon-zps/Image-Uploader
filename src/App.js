import React, { Component } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Uploading from "./components/Uploading/Uploading";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      isLoading: false,
    };
  }

  // loading = () => {
  //   if (this.state.isLoading === true) {
  //     return <Uploading />;
  //   } else if (this.state.isLoading === false && this.state.image === null) {
  //     return;
  //   } else {
  //     // <Result />;
  //     console.log("result");
  //   }
  // };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  };

  handleImageNull = () => {
    this.setState({ image: null });
  };

  handleWhatsHere = () => {
    if (this.state.isLoading === false && this.state.image === null) {
      return (
        <Home
          isLoading={this.state.isLoading}
          setLoading={this.handleLoading}
          handleImageNull={this.handleImageNull}
        />
      );
    } else if (this.state.isLoading === true) {
      return <Uploading />;
    }
  };

  render() {
    return <div className="App">{this.handleWhatsHere()}</div>;
  }
}

export default App;
