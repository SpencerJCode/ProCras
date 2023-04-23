import './App.css';
import Navbar from './components/Navbar'
import {Route, Routes, Navigate} from 'react-router-dom'
//from https://github.com/Volorf/Hover3D.js
// import "./js/hover3D";
// import './js/flipCard';
import Home from './views/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
