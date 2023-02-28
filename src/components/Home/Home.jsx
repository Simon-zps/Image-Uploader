import React, { useState, useCallback, useEffect } from "react";

import { storage } from "../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";

import dragAndDropImg from "../../assets/download.svg";

import { useDropzone } from "react-dropzone";

import "./Home.scss";

const Home = ({ isLoading, setLoading, handleImageNull }) => {
  const [image, setImage] = useState(null);

  const getLastRequestData = (callback) => {
    database.ref("lastRequestData").on("value", (snapshot) => {
      const data = snapshot.val();
      callback(data);
    });
  };

  useEffect(() => {
    if (image === null) {
      return;
    }

    uploadImage(image);
  }, [image]);

  const uploadImage = () => {
    console.log("here");
    if (image === null) return;
    setLoading(true);
    const imageRef = ref(storage, `images/${uuidv4()}`);
    console.log("sending image to firebase");
    uploadBytes(imageRef, image).then(() => {
      console.log("successfully sent image to firebase");
      setLoading(false);
    });
  };

  const DragDrop = () => {
    const onDrop = useCallback((acceptedFiles) => {
      console.log(acceptedFiles);
      setImage(acceptedFiles[0]);
      uploadImage();
      console.log("successfully ran Drag & Drop function. Output:", image);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()} className="drag-drop">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="drag-drop-2">Drop the files here ...</p>
        ) : (
          <>
            <img src={dragAndDropImg} alt="drag and drop something here..." />
            <p>Drag & Drop your image here</p>
          </>
        )}
      </div>
    );
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    console.log(image);
    uploadImage(); // call the uploadImage function after setting the image state
  };

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
        <input
          id="file-input"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleImageChange(e)}
        />
      </div>
    </div>
  );
};

export default Home;
