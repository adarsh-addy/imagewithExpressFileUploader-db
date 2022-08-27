const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const port = 8000;
app.use(express.static("uploads"));
app.use(express.static("./"));

const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
app.use(morgan());

//sample for root:__dirname
// app.get("/", (req, res) => {
//   res.sendFile("index.html",{root:__dirname});
// });

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// default options
app.use(fileUpload());

app.get("/ping", function (req, res) {
  res.send("pong");
});

const BackendRouter = require("./routes/backend");
app.use("/backend", BackendRouter);

app.listen(port, function () {
  console.log("Express server listening on port ", `${port}`); // eslint-disable-line
});
