// src/components/Profile/ProfileForm.jsx
import React, { useState } from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import { useAuth } from '../../contexts/authContext/authContext';
import styles from './ProfileForm.module.css';
import ReactFlagsSelect from 'react-flags-select';


const ProfileForm = ({ onSubmit }) => {
    const { createProfile, profiles } = useProfile();
    const { userLoggedIn, currentUser } = useAuth();
    const [profileData, setProfileData] = useState({UserID: userLoggedIn ? currentUser.uid : "none", Name: '', DateOfBirth: '', Gender: '', Nationality: ''});
    const [selected, setSelected] = useState('');
    const [errorNationality, setErrorNationality] = useState('');
    const [errorName, setErrorName] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        //if (name === 'Name' && checkProfileName(value)) setErrorName('A Profile already exists with that name');
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profileData.Nationality) {
            setErrorNationality('Nationality is required');
            return;
        }
        if (errorName) {
            return;
        }
        createProfile(profileData);
        if(onSubmit) onSubmit();
    };

    const checkProfileName = (name) => {
        return profiles.some(profile => profile.Name === name);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="Name" className={styles.label}>Name</label>
                <input
                    type="text"
                    maxLength="16"
                    name="Name"
                    className={styles.input}
                    value={profileData.Name}
                    onChange={(event) => {
                        handleChange(event);
                        if (checkProfileName(event.target.value)) {
                            setErrorName('A Profile already exists with that name');
                        }
                        else {
                            setErrorName('');
                        }
                    }}
                    required
                />
                {errorName && <p className={styles.error}>{errorName}</p>}
            </div>
            <div className={styles.formGroupNationality}>
                <label htmlFor="Nationality" className={styles.label}>Nationality</label>
                <ReactFlagsSelect
                    className={styles.inputNationality}
                    selectButtonClassName={styles.buttonNationality}
                    selected={selected}
                    onSelect={(code) => {
                        setSelected(code);
                        setProfileData({...profileData, Nationality: code});
                        setErrorNationality('');
                    }}
                    searchable={true}
                    placeholder="Select Country"
                    searchPlaceholder="Search countries"
                />
                {errorNationality && <p className={styles.error}>{errorNationality}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="DateOfBirth" className={styles.label}>Date of Birth</label>
                <input
                    type="date"
                    min="1900-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    className={styles.input}
                    name="DateOfBirth"
                    value={profileData.DateOfBirth}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="Gender" className={styles.label}>Gender</label>
                <select
                    name="Gender"
                    value={profileData.Gender}
                    onChange={handleChange}
                    required
                    className={styles.select}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button type="submit" className={styles.submitButton}>Create Profile</button>
        </form>
    );
};

export default ProfileForm;