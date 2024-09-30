import { logout } from "../Auth/Auth";
import { useNavigate, useLocation } from 'react-router-dom';
import styles from "./UserPopUp.module.css";

const UserPopUp = ({ onClickEffect }) => {
    const navigate = useNavigate();     // Hook for navigation
    const location = useLocation();

    return (
        <div className={styles.popup}>
            <button onClick={
                () => {
                    onClickEffect();
                    logout().then(r => {});
                    if (location.pathname.startsWith('/profile/')) {
                        navigate('/');              // Navigate to home page if on a profile page
                    }
                }}>Log Out</button>
        </div>
    );
}

export default UserPopUp;