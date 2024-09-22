// src/components/Profile/ProfileForm.jsx
import React, { useState } from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';
import { useAuth } from '../../contexts/authContext/authContext';


const ProfileForm = () => {
    const { createProfile } = useProfile();
    const { userLoggedIn, currentUser } = useAuth();
    const [profileData, setProfileData] = useState({UserID: userLoggedIn ? currentUser.uid : "none", Name: '', DateOfBirth: '', Gender: ''});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile(profileData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="Name"
                value={profileData.Name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="text"
                name="DateOfBirth"
                value={profileData.DateOfBirth}
                onChange={handleChange}
                placeholder="Date of birth"
                required
            />
            <input
                type="text"
                name="Gender"
                value={profileData.Gender}
                onChange={handleChange}
                placeholder="Gender"
                required
            />
            <button type="submit">Create Profile</button>
        </form>
    );
};

export default ProfileForm;