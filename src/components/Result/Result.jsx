import React, { useState } from "react";

import { motion } from "framer-motion";

import { AiFillCheckCircle } from "react-icons/ai";

import "./Result.scss";

const Result = (props) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.imageUrl).catch((error) => {
      alert(`Failed to copy "${props.imageUrl}" to clipboard: ${error}`);
    });
  };

  return (
    <div className="result-container">
      <motion.div
        initial={{ y: -1000, opacity: 0, scale: 0 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        <div className="result-card">
          <div className="wrapper">
            <div className="result-header">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <AiFillCheckCircle className="check" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.2 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <p>Upload Successful</p>
              </motion.div>
            </div>
            <div className="body-helper">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <div className="result-image" style={{ marginBottom: "1rem" }}>
                  <img src={props.imageUrl} alt="What you uploaded" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.1 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <div className="result-link">
                  <div className="bottom-wrapper">
                    <div className="wrapper-center">
                      <a href={props.imageUrl} rel="noreferrer" target="_blank">
                        <span>{props.imageUrl}</span>
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
      </motion.div>
      <div className="branding">
        created by{" "}
        <span>
          {" "}
          <a href="twitter.com/johnlhaab">johnhaab</a>
        </span>{" "}
        -{" "}
        <a className="link" href="devChallenges.io">
          devchallenges.io
        </a>
      </div>
    </div>
  );
};

export default Result;
