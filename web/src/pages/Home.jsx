import { Typography, Paper, Grid, Button } from "@material-ui/core";
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
        background: `url("https://i.imgur.com/LKFYqnQ.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div> {''}</div>
      <img src={"https://i.imgur.com/DWgXLda.png"} height="15%" alt="logo" style = {{marginTop:  20}}/>

      <Typography variant="h1" style={{  marginBottom: 20, color: "white" }}>
        Re:Meet
      </Typography>
      <Typography variant="h4" style={{ marginBottom: 65, color: "white" }}>
        Make plans faster, easier, and more conveniently.
      </Typography>
      {/* <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height,
      }}> */}
      <Login />
      {/* </div> */}
      {/* <Paper style={{ margin: 1, width: "100%", height: "200%" }}>
        <div>hello world</div>
      </Paper>
      <Paper style={{ margin: 1, width: "100%", height: "200%" }}>
        <div>hello world</div>
      </Paper> */}
    </div>
  );
};
