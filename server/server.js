const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// const Monster = require("./models/monster");
// const MapData = require("./models/mapData");
// const keepDynoAwake = require("./keepDynoAwake");
// const path = require("path");

const userRouter = require("./routes/users");

//const userRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

//Simple Route
// app.get("/hello", function (req, res) {
//   return res.send("Hello world");
// });

// app.use("/users", userRouter);

// app.get("/monsters", async (req, res) => {
//   try {
//     const payload = await Monster.find();
//     res.status(200).send(payload);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/mapData", async (req, res) => {
//   try {
//     const payload = await MapData.find();
//     res.status(200).send(payload);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get("/add", async (req, res) => {
//   try {
//     const elderDrag = new MapData(elder);
//     await elderDrag.save();
//     res.status(200).send("ok");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/secret", (req, res) => {
//   res.send("blehhhh");
// });

// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

app.use("/users", userRouter);
app.listen(port, () => {
  // if (process.env.NODE_ENV === "production") {
  //   console.log("keepDynoAwake is running");
  //   keepDynoAwake("https://one-hp.herokuapp.com/secret");
  // }

  console.log(`Server is running on port: ${port}`);
});
