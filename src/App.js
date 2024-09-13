import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navbar';
import { AuthProvider } from "./contexts/authContext";


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
