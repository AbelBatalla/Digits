import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { AuthProvider } from "./contexts/authContext/authContext";


const App = () => {
  return (
    <div className="App">
        <AuthProvider>
            <Navbar />
            <Outlet />
        </AuthProvider>
    </div>
  );
}

export default App;
