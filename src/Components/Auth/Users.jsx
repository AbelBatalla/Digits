import { useState } from "react";
import { useAuth } from "../../contexts/authContext/authContext";
import { loginEmail, logout, loginGoogle, passwordReset, signUpEmail } from "./Auth";
import styles from "./Users.module.css";

const Users = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <input
                name = "email"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                name = "password"
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => {loginEmail(email, password)}}> Log In</button>

            <button onClick={loginGoogle}> Log In With Google</button>

            <button onClick={logout}> Logout </button>
        </div>
    );
};
export default Users;
