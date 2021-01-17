const express = require("express");
const cors = require("cors");
const path = require("path");
const keepDynoAwake = require("./keepDynoAwake");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/secret", (req, res) => {
  res.send("blehhhh");
});

app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  if (process.env.NODE_ENV === "production") {
    console.log("keepDynoAwake is running");
    keepDynoAwake("https://one-hp.herokuapp.com/secret");
  }

  console.log(`Server is running on port: ${port}`);
});
