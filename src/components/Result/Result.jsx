import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

import { AiFillCheckCircle } from "react-icons/ai";

import "./Result.scss";

const Result = ({ getLastUploadedImage }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function getLastImage() {
      const url = await getLastUploadedImage();
      setImageUrl(url);
    }
    getLastImage();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl).catch((error) => {
      alert(`Failed to copy "${imageUrl}" to clipboard: ${error}`);
    });
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="wrapper">
          <div className="result-header">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              <AiFillCheckCircle className="check" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ delay: 1 }}
              viewport={{ once: true }}
            >
              <p>Upload Successful</p>
            </motion.div>
          </div>
          <div className="body-helper">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: 1.5 }}
              viewport={{ once: true }}
            >
              <div className="result-image" style={{ marginBottom: "1rem" }}>
                <img src={imageUrl} alt="What you uploaded" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.1 }}
              transition={{ delay: 2 }}
              viewport={{ once: true }}
            >
              <div className="result-link">
                <div className="bottom-wrapper">
                  <div className="wrapper-center">
                    <a href={imageUrl} rel="noreferrer" target="_blank">
                      <span>{imageUrl}</span>
                    </a>
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard()}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
