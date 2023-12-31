import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Opening from "./Pages/Opening.tsx";
import NoPage from "./Pages/NoPage.tsx";
import Weekly from "./Pages/Weekly.tsx";
import Monthly from "./Pages/Monthly.tsx";
import Closning from "./Pages/Closning.tsx";
import Layout from "./Pages/Layout.tsx";
import Special from "./Pages/Special.tsx";
import Summary from "./Pages/Summary.tsx";
import Upload from "./Pages/Upload.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/Opening" element={<Opening />} />
          <Route path="/Closning" element={<Closning />} />
          <Route path="Monthly" element={<Monthly />} />
          <Route path="Weekly" element={<Weekly />} />
          <Route path="Special" element={<Special />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
