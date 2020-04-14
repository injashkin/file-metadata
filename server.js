"use strict";

var express = require("express");
var cors = require("cors");

// require and use "multer"...
const multer = require("multer");

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.get("/hello", function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post("/api/fileanalyse", function (req, res) {
  //
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  })

  var upload = multer({ storage: storage });

  var uploadFile = upload.single('upfile');

  uploadFile(req, res, function (err) {
    let filedata = req.file;    

    if (!filedata) {
      res.send("Ошибка при загрузке файла");
    }

    var out = {
      filename: filedata.filename,
      size: filedata.size
    }
    res.send(out);
  })

});

app.listen(process.env.PORT || 3000, function () {
  console.log("Node.js listening ...");
});
