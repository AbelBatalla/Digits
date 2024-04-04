import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home, Play, Other } from './Components/Pages';

const App = () => {
  return (
    <div className="App">
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digits" element={<Play />} />
            <Route path="/Other" element={<Other />} />
        </Routes>
    </div>
  );
}

export default App;
