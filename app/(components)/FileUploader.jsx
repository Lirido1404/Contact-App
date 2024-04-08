"use client";
import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");

  const handleFileChange = (event) => {
    if (event.target.files) {
      setStatus("initial");
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      try {
        const result = await fetch("/api/uploadVCF", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
    <main className="text-white">
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <button onClick={handleUpload} className="submit">
          Upload File
        </button>
      )}

      <Result status={status} />
      </main>
    </>
  );
};

const Result = ({ status }) => {
  switch (status) {
    case "success":
      return <p>✅ File uploaded successfully!</p>;
    case "fail":
      return <p>❌ File upload failed!</p>;
    case "uploading":
      return <p>⏳ Uploading selected file...</p>;
    default:
      return null;
  }
};

export default FileUploader;
