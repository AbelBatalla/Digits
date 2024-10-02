import { logout } from "../Auth/Auth";
import { useNavigate, useLocation } from 'react-router-dom';
import { useProfile } from "../../contexts/profileContext/profileContext";
import styles from "./UserPopUp.module.css";
import ProfileSelector from "../Profiles/ProfileSelector";

const UserPopUp = ({ onClickEffect }) => {
    const navigate = useNavigate();     // Hook for navigation
    const location = useLocation();
    const { activeProfile, profiles } = useProfile();

    return (
        <div className={styles.popup}>
            <ProfileSelector />
            {profiles.length > 0 && (
            <button className={styles.profileButton}
                onClick={() => {
                    onClickEffect();
                    navigate(`/profile/${activeProfile.Name}`);
                }}>Manage Profiles</button>
            )}

            <button className={styles.logoutButton}
                onClick={
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