
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Fab } from "@mui/material";

const Back = () => {
  const navigate = useNavigate();
  return (
    <Fab
      color="#dd1a1a"
      className="sss"
      onClick={() => navigate(-1)}
      aria-label="add"
    >
      <ArrowBack />
    </Fab>
  );
};

export default Back;