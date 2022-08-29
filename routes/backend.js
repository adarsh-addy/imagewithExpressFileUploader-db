const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const BackendRouter = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "userprofile",
});

// BackendRouter.use(fileUpload());

db.getConnection((err, connection) => {
  //for checking db connection to local server
  if (err) throw err; // not connected
  console.log("Connected!");
});

let baseURL = "http://localhost:8000/";
BackendRouter.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;
console.log("hello");
  let name = req.body.name;
  console.log("name",name);
  if (!name && !req.files || Object.keys(req.files).length === 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  sampleFile = req.files.sampleFile;
  uploadPath = path.join(__dirname, "../uploads/", sampleFile.name);

  // uploadPath = __dirname + '/uploads/' + sampleFile.name;

  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    db.getConnection(async (err, connection) => {
      if (err) throw err;
      console.log("db connected");

      const sqlSearch =
      "SELECT *FROM image WHERE image=?";
    const search_query = mysql.format(sqlSearch, [ baseURL + sampleFile.name]);

      const sqlInsert = "INSERT INTO image (name,image) VALUES (?,?)";
      const insert_query = mysql.format(sqlInsert, [
        name,
        baseURL + sampleFile.name,
      ]);

      
    // now asking the connection for sql database for the given record;
    await connection.query(search_query, async (err, result) => {
      if (err) throw err;
      console.log("------>searching for result");
      console.log(result.length);
      if (result.length != 0) {
        // releasing the connection with database;
        connection.release();
        console.log("Record already exists");
        res.json({
          message: "Record already exists",
        });
      } else {

      await connection.query(insert_query, (err, result) => {
        if (err) throw err;
        console.log("image inserted");
        res.json({
          message: "record inserted successfully",
          result: result,
        });
        connection.release();
      });
    }
    });
  });
  
});

})

BackendRouter.get("/show", async (req, res) => {
  db.getConnection(async (err, connection) => {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM image";
    await connection.query(sqlSearch, (err, result) => {
      if (err) throw err;
      console.log("result", result);
      res.json({
        message: "Get Query Executed",
        records: result,
      });
      connection.release();
    });
  });
});

module.exports = BackendRouter;
