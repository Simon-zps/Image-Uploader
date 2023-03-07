import React, { useState, useCallback, useEffect } from "react";
import { storage } from "../../services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import dragAndDropImg from "../../assets/download.svg";
import { useDropzone } from "react-dropzone";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";

import "./Home.scss";

const Home = ({ setLoading, handleHasResults }) => {
  const [image, setImage] = useState(null);
  const [errMsg, setErrorMsg] = useState(null);
  const [hasErr, setErr] = useState(false);

  const uploadImage = (file) => {
    if (!file) return;
    console.log(storage);
    setLoading(true);
    const imageRef = ref(storage, `images/${uuidv4()}`);
    uploadBytes(imageRef, file).then(() => {
      handleHasResults();
    });
  };

  const DragDrop = () => {
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
      setErr(false);
      setFile(acceptedFiles[0]);
      handleDragDrop(acceptedFiles[0]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()} className="drag-drop">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="drag-drop-2">Drop your image here ...</p>
        ) : (
          <>
            <img src={dragAndDropImg} alt="drag and drop something here..." />
            <p>Drag & Drop your image here</p>
          </>
        )}
      </div>
    );
  };

  const handleDragDrop = (file) => {
    console.log(file);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      uploadImage(file);
      setErr(false);
    } else {
      setErr(true);
      showErrMsg();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      uploadImage(file);
    } else {
      setErr(true);
      showErrMsg();
    }
  };

  const showErrMsg = () => {
    if (hasErr) {
      setErrorMsg(
        <motion.div
          initial={{ y: -100, scale: 0, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            type: "linear",
            damping: 10,
            stiffness: 100,
            delayChildren: 0.5,
          }}
        >
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
            className="err-msg"
          >
            Please upload a valid image file. (png, jpg, jpeg, heic)
          </Alert>
        </motion.div>
      );
    } else {
      setErrorMsg(
        <motion.div
          initial={{ y: -100, scale: 0, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            type: "linear",
            damping: 10,
            stiffness: 100,
            delayChildren: 0.5,
          }}
        >
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
            className="err-msg"
          >
            Please upload a valid image file. (png, jpg, jpeg, heic)
          </Alert>
        </motion.div>
      );
      setErr(true);
    }
  };

  const hideErrMsg = () => {
    setErrorMsg(null);
    setErr(false);
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
      <div className="branding">
        <p className="letter">created</p>
        <p> by</p>
        <span>
          <a href="twitter.com/johnlhaab">johnhaab</a>
        </span>
        -
        <a className="link" href="devChallenges.io">
          devchallenges.io
        </a>
      </div>
    </div>
  );
};

export default Home;
