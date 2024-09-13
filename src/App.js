import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Pages/Home';
import Other from './Components/Pages/Other';
import Play from './Components/Pages/Play';
import { AuthProvider } from "./contexts/authContext";


const App = () => {
  return (
    <div className="App">
        <AuthProvider>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/digits" element={<Play />} />
                <Route path="/other" element={<Other />} />
            </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
