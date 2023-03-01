import React, { useState, useCallback, useEffect } from "react";
import { storage } from "../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import dragAndDropImg from "../../assets/download.svg";
import { useDropzone } from "react-dropzone";
import Alert from "@mui/material/Alert";

import "./Home.scss";

const Home = ({ isLoading, setLoading, handleHasResults }) => {
  const [image, setImage] = useState(null);
  const [errMsg, setErrorMsg] = useState(false);
  const [hasErr, setErr] = useState(false);

  useEffect(() => {
    if (image === null) {
      return;
    }

    uploadImage(image);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const uploadImage = () => {
    if (image === null) return;
    setLoading(true);
    const imageRef = ref(storage, `images/${uuidv4()}`);
    uploadBytes(imageRef, image).then(() => {
      console.log("successfully sent image to firebase");
      handleHasResults();
      setLoading(false);
    });
  };

  const DragDrop = () => {
    const onDrop = useCallback((acceptedFiles) => {
      setImage(acceptedFiles[0]);
      uploadImage();
      console.log("successfully ran Drag & Drop function --- Output:", image);
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
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      uploadImage();
    } else {
      setErr(true);
      showErrMsg();
      console.log("here");
    }
  };

  const showErrMsg = () => {
    setErrorMsg(
      <Alert
        icon={false}
        onClose={() => {
          hideErrMsg();
        }}
        style={{
          marginBottom: "1.5rem",
          backgroundColor: "#7678ed",
          color: "#fff",
        }}
      >
        Please upload a valid image file. (png, jpg, jpeg, heic)
      </Alert>
    );
  };

  const hideErrMsg = () => {
    setErrorMsg(false);
  };

  return (
    <div className="container">
      {errMsg}
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
