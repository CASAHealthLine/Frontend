import React from "react";
import {Typography} from "../Typography";

const PatientBanner: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#008080",
        color: "white",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">CASA HealthLine</Typography>
    </div>
  );
};

export default PatientBanner;
