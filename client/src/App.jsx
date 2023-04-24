import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import MyCards from "./views/MyCards";
import Browse from "./views/Browse";
import Study from "./views/Study";



function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Browse" element={<Browse />} />
          <Route path="/MyCards" element={<MyCards />} />
          <Route path="/Study" element={<Study />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
