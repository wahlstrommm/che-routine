import React, { useState } from "react";
import { Routine } from "../Types/types";
import axios, { AxiosResponse } from "axios";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail"
  >("initial");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          // Handle the response or update the UI here
        })
        .catch((error) => {
          console.error(error);
          // Handle errors here
        });
    }
  };
  return (
    <>
      <div>
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

      {file && <button onClick={handleUpload}>Upload a file</button>}
    </>
  );
}
