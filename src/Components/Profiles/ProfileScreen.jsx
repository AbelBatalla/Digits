import React from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import styles from './ProfileScreen.module.css';
import {useParams, useNavigate, Link} from 'react-router-dom';
import ProfileSidebar from './ProfileSidebar';
import countryList from 'react-select-country-list';
import {FaPen, FaTrash} from "react-icons/fa";


const ProfileScreen = () => {
    const { profileName } = useParams();
    const { profiles, deleteProfile, setActiveProfile } = useProfile();
    const profile = profiles.find(p => p.Name === profileName);
    const countries = countryList().getData();
    const countryMap = countries.reduce((acc, country) => {
        acc[country.value] = country.label;
        return acc;
    }, {});
    const navigate = useNavigate();

    const handleDelete = async () => {
        await deleteProfile(profileName);
        if (profiles.length > 0) {
            if (profileName === profiles[0].Name) {
                if (profiles.length > 1) navigate(`/profile/${profiles[1].Name}`);
                else navigate('/');
            }
            else navigate(`/profile/${profiles[0].Name}`);
        }
        else navigate('/');
    }

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
                    <div className={styles.profileDetailContainer}>
                    <div className={styles.profileDetail}>
                        <h1>{profile.Name}</h1>
                        <p>Date of Birth: {profile.DateOfBirth}</p>
                        <p>Gender: {profile.Gender}</p>
                        <p>Nationality: {countryMap[profile.Nationality]}</p>
                        <Link to={`/stats`}
                              onClick={() => {
                                    setActiveProfile(profile);
                              }}
                              className={styles.link}
                        >See Stats</Link>
                    </div>
                        <div className={styles.buttonContainer}>
                            <div className={styles.icon} onClick={(e) => {
                                //handleDelete();
                            }}><FaPen/></div>
                            <div className={styles.iconTrash} onClick={(e) => {
                                if (window.confirm('Are you sure you want to delete this profile?')) {
                                    handleDelete(profile.Name).then(r => {});
                                }
                            }}><FaTrash/></div>
                        </div>
                    </div>
                ) : (
                    <div>Profile not found</div>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;