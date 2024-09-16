import { logout } from "../Auth/Auth";
import styles from "./UserPopUp.module.css";

const UserPopUp = () => {
    return (
        <div className={styles.popup}>
            <button onClick={logout}>Log Out</button>
        </div>
    );
}

export default UserPopUp;