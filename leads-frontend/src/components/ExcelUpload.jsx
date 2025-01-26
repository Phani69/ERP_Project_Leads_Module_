import React, { useState } from "react";
import axios from "axios";

const ExcelUpload = ({ refreshLeads }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:5001/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Leads imported successfully!");
      refreshLeads();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to import leads");
    }
  };

  return (
    <div>
      <h3>Import Leads from Excel</h3>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ExcelUpload;
