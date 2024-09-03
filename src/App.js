import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home, Play, Other } from './Components/Pages';
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
