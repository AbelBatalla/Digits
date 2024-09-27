import React from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileScreen.module.css';
import { useParams } from 'react-router-dom';
import ProfileSelectScreen from './ProfileSelectScreen';
import ProfileSidebar from './ProfileSidebar';

const ProfileScreen = () => {
    const { profileName } = useParams();
    const { profiles } = useProfile();
    const profile = profiles.find(p => p.Name === profileName);

    return (
        <div className={styles.profileScreen}>
            <ProfileSidebar />
            <div className={styles.profileContent}>
                <ProfileSelectScreen currentProfile={profileName} />
                {profile ? (
                    <div className={styles.profileDetail}>
                        <h1>{profile.Name}</h1>
                        <p>Email: {profile.DateOfBirth}</p>
                        <p>Phone: {profile.Nationality}</p>
                        {/* Add more profile details as needed */}
                    </div>
                ) : (
                    <div>Profile not found</div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;