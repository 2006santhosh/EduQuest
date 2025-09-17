import React, { useState } from "react";
import axios from "axios";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFile(res.data.filePath);
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Upload
      </button>

      {uploadedFile && (
        <div className="mt-6">
          <p className="text-green-600">File uploaded successfully:</p>
          <img
            src={`http://localhost:5000${uploadedFile}`}
            alt="Uploaded Preview"
            className="mt-4 w-64 rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
