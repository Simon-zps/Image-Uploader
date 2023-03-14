import React from "react";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import { motion } from "framer-motion";

import "./Uploading.scss";

const Uploading = () => {
  return (
    <motion.div>
      <div className="container-uploading">
        <div className="card-uploading">
          <div className="card-wrapper">
            <h1>Uploading...</h1>
            <Box sx={{ width: "100%" }} className={"box"}>
              <LinearProgress className="loader" />
            </Box>
          </div>
        </div>
        <div className="branding">
          <p className="letter">backend</p>
          <p> by</p>
          <span>
          <a href="https://github.com/Simon-zps" target="blank">Simon</a>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Uploading;
