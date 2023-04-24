import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./views/Home";
import MyCards from "./views/MyCards";
import Browse from "./views/Browse";
import Study from "./views/Study";
import { useEffect } from "react";

function App() {

  useEffect(() => {});

  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mycards" element={<MyCards />} />
          <Route path="/study" element={<Study />} />
          <Route path="/browse" element={<Browse />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
