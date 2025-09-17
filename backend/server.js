// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Enable CORS so your React frontend (likely on localhost:3000) can talk to this server
app.use(cors());
app.use(express.json());

// Make uploads folder if it doesn't exist
const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // Use timestamp + original name to avoid overwriting
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Only accept PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// === ROUTE: Upload file ===
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Respond with file info
  res.json({
    id: Date.now(), // simple unique id
    name: req.file.originalname,
    path: req.file.path,
    status: "Uploaded",
    uploadDate: new Date(),
  });
});

// === ROUTE: Get all uploaded files (optional) ===
app.get("/uploads", (req, res) => {
  fs.readdir(uploadFolder, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read uploads folder" });

    const fileList = files.map((file) => ({
      name: file.split("-").slice(1).join("-"), // original name
      path: path.join(uploadFolder, file),
      status: "Uploaded",
      uploadDate: fs.statSync(path.join(uploadFolder, file)).birthtime,
    }));

    res.json(fileList);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
