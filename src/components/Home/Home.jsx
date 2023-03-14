import React, { useState, useCallback, useEffect } from "react";
import dragAndDropImg from "../../assets/download.svg";
import { useDropzone } from "react-dropzone";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import "./Home.scss";
import axios from "axios";


const Home = ({ setLoading, handleHasResults, handleResult }) => {
  const [image, setImage] = useState(null);
  const [errMsg, setErrorMsg] = useState(null);
  const [hasErr, setErr] = useState(false);

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await axios.post('http://localhost:8000/api/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        return data;
      } 
      
      else {
        console.error('Error uploading image:', response.status);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
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

  const handleDragDrop = async (file) => {
    console.log(file);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      setLoading(true);

      await uploadImage(file);
      
      setTimeout(() => {
      setLoading(false);
      setErr(false);
      handleResult(true);
    }, 1000); // set the timeout to 1 second (for demonstration purposes)

    } else {
      setErr(true);
      showErrMsg();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/heic"];

    if (file && allowedTypes.includes(file.type)) {
      setImage(file);
      setLoading(true);
      await uploadImage(file);
      
      setTimeout(() => {
        setLoading(false);
        setErr(false);
        handleResult(true);
      }, 1000); // set the timeout to 1 second (for demonstration purposes)

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
        <p className="letter">backend</p>
        <p> by</p>
        <span>
          <a href="https://github.com/Simon-zps" target="blank">Simon</a>
        </span>
      </div>
    </div>
  );
};

export default Home;
