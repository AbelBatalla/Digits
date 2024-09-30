import React from 'react';
import {Link, useParams} from 'react-router-dom';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileSidebar.module.css';

const ProfileSidebar = () => {
    const { profiles } = useProfile();
    const { profileName } = useParams();

    return (
        <div className={styles.sidebar}>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}
                        className={profileName === profile.Name ? styles.selectedProfile : ''}
                    >
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