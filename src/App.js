import React, { Component } from "react";

import "./App.css";
import Home from "./components/Home/Home";
import Uploading from "./components/Uploading/Uploading";
import Result from "./components/Result/Result";

import {
  listAll,
  ref,
  getStorage,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

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

  getLastUploadedImage = async () => {
    const storage = getStorage();
    const imagesRef = ref(storage, "images/");

    try {
      const res = await listAll(imagesRef);
      let mostRecentItem = null;
      for (const item of res.items) {
        const metadata = await getMetadata(item);
        if (
          !mostRecentItem ||
          metadata.timeCreated > mostRecentItem.metadata.timeCreated
        ) {
          mostRecentItem = { ref: item, metadata };
        }
      }
      if (mostRecentItem) {
        const downloadUrl = await getDownloadURL(mostRecentItem.ref);
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

  handleHasResults = () => {
    if (this.state.imageUrl !== null) {
      return;
    } else {
      this.getLastUploadedImage();
    }
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
          imageUrl={this.state.imageUrl}
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
