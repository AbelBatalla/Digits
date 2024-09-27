import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileSidebar.module.css';

const ProfileSidebar = () => {
    const { profiles } = useProfile();

    return (
        <div className={styles.sidebar}>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}>
                        <Link to={`/profile/${profile.Name}`} className={styles.profileLink}>
                            {profile.Name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileSidebar;