import React, { useEffect, useState } from "react";

import {
  listAll,
  ref,
  getStorage,
  getMetadata,
  getDownloadURL,
} from "firebase/storage";

import { motion } from "framer-motion";

import { AiFillCheckCircle } from "react-icons/ai";

import "./Result.scss";

const Result = ({ setLoading }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    async function getLastImage() {
      const url = await getLastUploadedImage();
      setImageUrl(url);
    }
    getLastImage();
    getLastUploadedImage();
  }, []);

  const getLastUploadedImage = async () => {
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
        console.log("Most recent image URL:", downloadUrl);
        return downloadUrl;
      }
      console.log("No images found");
      return null;
    } catch (error) {
      console.log("Error retrieving last uploaded image:", error);
      return null;
    }
  };

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
            <AiFillCheckCircle className="check" />
            <p>Uploaded successfully!</p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ delay: 1 }}
            viewport={{ once: true }}
          >
            <div className="result-image" style={{ marginBottom: "1rem" }}>
              <img src={imageUrl} alt="What you uploaded" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ delay: 1.5 }}
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
  );
};

export default Result;
