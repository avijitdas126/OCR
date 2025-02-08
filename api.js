const express = require("express");
var cors = require("cors");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const ocr = require(".");
const app = express();
app.use(cors());
app.use(fileUpload());
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});
let delete_file = async (id) => {
  try {
    const result = await cloudinary.uploader.destroy(id, { invalidate: true });
    console.log("File deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

app.post("/upload/ocr", async (req, res) => {

  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.files.file;

    // Upload directly to Cloudinary
    const result = await cloudinary.uploader
      .upload_stream(
        { resource_type: "auto", folder: "ocr" },
        async (error, result) => {
          if (error) return res.status(500).json({ error: error.message });
          let id = result?.public_id;

          let url = result?.secure_url;
        
            let text = await ocr(url);
            delete_file(id);
            res.json({ text });
        
        }
      )
      .end(file.data); // Send file buffer
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/ocr", async (req, res) => {
  const url = req.query.url;
  try {
    let text = await ocr(url);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(3000, () => console.log("Server running on port no:3000"));
