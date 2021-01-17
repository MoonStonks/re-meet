import { Typography } from "@material-ui/core";
import React from "react";
import { Login } from "./Login";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
// import sections
// import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
// import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';



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
    {/* <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider />
    </> */}
      <img src = {"https://i.imgur.com/DWgXLda.png"} height = "10%" alt = "logo" />
      
      <Typography variant="h1" style={{ marginBottom: 30, color: "white" }}>
       Re:Meet
      </Typography>
      <Typography variant="h3" style={{ marginBottom: 70, color: "white" }}>
       Make plans faster, easier, and more conveniently.
      </Typography>
      <Login />
    </div>
  );
};
