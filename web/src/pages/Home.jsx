import { Typography } from "@material-ui/core";
import React from "react";
import { Login } from "./Login";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

export const Home = () => {
  const { height } = useWindowDimensions();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height,
      }}
    >
      <Typography variant="h1" style={{ marginBottom: 70, color: "white" }}>
        Calendar
      </Typography>
      <Login />
    </div>
  );
};
