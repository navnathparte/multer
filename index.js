//Imports
const express = require("express");
const multer = require("multer");

// create app 
const app = express();
const port = 3000;

//Imports
const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
  });

//create multer instance
const upload = multer({
    storage: multerStorage
})

app.get("/", (req, res) => {
  res.send("hello welcome!!!");
});

// For single file upload
app.post("/single", upload.single("myfile"), (req, res) => {
  try {
    console.log(req);
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

// For multiple files upload
app.post("/bulk", upload.array("myfiles"), (req, res) => {
  try {
    res.send(req.files);
  } catch (error) {
    console.log(error);
    res.send(400);
  }
});

app.listen(port, () => {
  console.log(`Listing to the Port: ${port}`);
});