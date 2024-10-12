import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import { AuthProvider } from "./contexts/authContext/authContext";
import { ProfileProvider } from "./contexts/profileContext/profileContext";
import CheckPrivacyPolicy from "./Components/Pages/CheckPrivacyPolicy";


const App = () => {
  return (
    <div className="App">
        <AuthProvider>
            <ProfileProvider>
                <Navbar />
                <CheckPrivacyPolicy />
                <Outlet />
            </ProfileProvider>
        </AuthProvider>
    </div>
  );
}

export default App;
