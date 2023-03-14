import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Uploading from "./components/Uploading/Uploading";
import Result from "./components/Result/Result";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageUrl: null,
      hasRecent: false,
      isLoading: false,
      hasResults: false,
    };
  }

  // Define the function outside of the constructor
  getLastUploadedImage = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/images/");
      const images = response.data;
      let mostRecentItem = null;

      for (const item of images) {
        if (
          !mostRecentItem ||
          item.created > mostRecentItem.created
        ) {
          mostRecentItem = item;
          console.log(mostRecentItem);
        }
      }
      if (mostRecentItem) {
        const downloadUrl = mostRecentItem.url;
        this.setState({ imageUrl: downloadUrl });
        this.setState({ hasRecent: true });
        this.setState({ hasResults: true });
        this.setState({ isLoading: false });
        return downloadUrl;
      }
      console.log("No images found");
      return null;
    } catch (error) {
      console.log("Error retrieving last uploaded image:", error);
      return null;
    }
  };

  handleLoading = (loadingState) => {
    this.setState({ isLoading: loadingState });
  };

  handleResult = (resultState) => {
    this.setState({ hasResults: resultState });
  };

  handleHasResults = () => {
    if (this.state.imageUrl !== null) {
      return;
    } else {
      // Call the function using 'this' keyword
      this.getLastUploadedImage();
    }
  };
  

  handleWhatsHere = () => {
    if (
      this.state.isLoading === false &&
      this.state.image === null &&
      this.state.hasResults === false
    ) {
      console.log("Displaying Home Page")
      return (
        <Home
          isLoading={this.state.isLoading}
          imageUrl={this.state.imageUrl}
          setLoading={this.handleLoading}
          handleHasResults={this.handleHasResults}
          handleResult={this.handleResult}
        />
      );
    } else if (this.state.isLoading === true) {
      console.log("Displaying Uploading Page")
      return <Uploading />;
    } else if (
      this.state.hasResults === true &&
      this.state.isLoading === false
    ) {
      console.log("Displaying Result Page")
      return (
        <Result
          getLastUploadedImage={this.getLastUploadedImage}
          imageUrl={this.state.imageUrl}
        />
      );
    }
  };

  render() {
    return <div className="App">{this.handleWhatsHere()}</div>;
  }
}

export default App;
