import React, { useState } from "react";

import "./style.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import DaoDetail from "./components/DaoDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
import ToolsList from "./components/ToolsList";
import TopDaos from "./components/TopDaos";
import Footer from "./components/Footer";

const serverUrl = "https://vyoiaqjuyaxb.usemoralis.com:2053/server";
const appId = "Cokd9mczsnd1q3YAZsy2zI0IKLlnVIxKWf1Hfdt8";

function App() {
  return (
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:dao" element={<DaoDetail />} />
          <Route path="/toolsList" element={<ToolsList />} />
          <Route path="/topdaos" element={<TopDaos />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MoralisProvider>
  );
}

export default App;
