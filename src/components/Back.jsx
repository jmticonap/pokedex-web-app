import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Fab } from "@mui/material";
import "./css/back.css";

const Back = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="#dd1a1a"
      className="back"
      onClick={() => navigate(-1)}
      aria-label="add"
      sx={{position: 'absolute', left: '10px', top: '175px'}}
    >
      <ArrowBack />
    </Fab>
  );
};

export default Back;
