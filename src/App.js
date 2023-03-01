import React, { Component } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Uploading from "./components/Uploading/Uploading";
import Result from "./components/Result/Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      isLoading: false,
      hasResults: false,
    };
  }

  componentDidMount() {
    this.setState({ image: null });

    this.setState({ isLoading: false });

    if (this.state.isLoading === true) {
      this.setState({ isOnHome: true });
    }
  }

  handleLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
    console.log(this.state.hasResults);
    console.log(this.state.isLoading);
  };

  handleHasResults = () => {
    this.setState({ hasResults: true });
    this.setState({ isLoading: false });
  };

  handleWhatsHere = () => {
    if (
      this.state.isLoading === false &&
      this.state.image === null &&
      this.state.hasResults === false
    ) {
      return (
        <Home
          isLoading={this.state.isLoading}
          setLoading={this.handleLoading}
          handleHasResults={this.handleHasResults}
        />
      );
    } else if (this.state.isLoading === true) {
      return <Uploading />;
    } else if (
      this.state.hasResults === true &&
      this.state.isLoading === false
    ) {
      return <Result setLoading={this.handleLoading} />;
    }
  };

  render() {
    return <div className="App">{this.handleWhatsHere()}</div>;
  }
}

export default App;
