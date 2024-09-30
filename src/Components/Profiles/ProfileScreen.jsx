import React from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileScreen.module.css';
import { useParams } from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import countryList from 'react-select-country-list';


const ProfileScreen = () => {
    const { profileName } = useParams();
    const { profiles } = useProfile();
    const profile = profiles.find(p => p.Name === profileName);
    const countries = countryList().getData();
    const countryMap = countries.reduce((acc, country) => {
        acc[country.value] = country.label;
        return acc;
    }, {});

    return (
        <div className={styles.profileScreen}>
            {false && (
                <div className={styles.headerContainer}>
                    <h1>Profiles</h1>
                </div>
            )}
            <ProfileSidebar/>
            <div className={styles.profileContent}>
                {profile ? (
                    <div className={styles.profileDetail}>
                        <h1>{profile.Name}</h1>
                        <p>Date of Birth: {profile.DateOfBirth}</p>
                        <p>Gender: {profile.Gender}</p>
                        <p>Nationality: {countryMap[profile.Nationality]}</p>
                    </div>
                ) : (
                    <div>Profile not found</div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;