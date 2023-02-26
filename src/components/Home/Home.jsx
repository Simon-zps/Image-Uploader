import React, { useState, useCallback } from "react";

import { storage } from "../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

import dragAndDropImg from "../../assets/download.svg";

import { useDropzone } from "react-dropzone";

import "./Home.scss";

const fileTypes = ["JPG", "PNG"];

const Home = () => {
  const [image, setImage] = useState(null);
  const uploadImage = () => {
    if (image === null) return;
    const imageRef = ref(storage, `images/${uuidv4()}`);
    console.log("sending image to firebase");
    uploadBytes(imageRef, image).then(() => {
      console.log("successfully sent image to firebase");
    });
  };

  const DragDrop = () => {
    const onDrop = useCallback((acceptedFiles) => {
      console.log(acceptedFiles);
      // setImage(acceptedFiles[0]);
      // uploadImage();
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div
        {...getRootProps()}
        style={{
          border: "3px solid red",
          width: "20rem",
          height: "30rem",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <img src={dragAndDropImg} alt="drag and drop something here..." />
            <p>Drag & Drop your image here</p>
          </>
        )}
      </div>
    );
  };

  // <img src={dragAndDropImg} alt="drag and drop something here..." />
  //       <p>Drag & Drop your image here</p>

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Upload your image</h1>
          <p>File should be .jpeg or .png</p>
        </div>
        <div className="card-body">{DragDrop()}</div>
        <p className="or">Or</p>
        <label htmlFor="file-input" className="choose-file">
          Choose file
        </label>
        <input id="file-input" type="file" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Home;
