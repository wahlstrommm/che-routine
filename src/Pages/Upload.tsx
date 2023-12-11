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
      setStatus("uploading");

      const formData = new FormData();
      formData.append("file", file);

      try {
        // Use a try-catch block to handle asynchronous code in a synchronous context
        axios
          .post("http://localhost:3000/upload", formData)
          .then((response) => {
            console.log(response.data);
            setStatus("success");
          })
          .catch((error) => {
            console.error(error);
            setStatus("fail");
          });
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
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
          Ladda upp fil
        </button>
      )}

      <Result status={status} />
    </>
  );
}

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ Uppladdningen av filen lyckades!</p>;
  } else if (status === "fail") {
    return <p>❌ Filuppladdningen misslyckades!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uppladdning av vald fil pågår...</p>;
  } else {
    return null;
  }
};
