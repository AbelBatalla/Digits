import { logout } from "../Auth/Auth";
import styles from "./UserPopUp.module.css";

const UserPopUp = ({ onClickEffect }) => {

    return (
        <div className={styles.popup}>
            <button onClick={
                () => {
                    onClickEffect();
                    logout();
                }}>Log Out</button>
        </div>
    );
}

export default UserPopUp;