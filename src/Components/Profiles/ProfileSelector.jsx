// src/components/Profile/ProfileSelector.jsx
import React from 'react';
import { useProfile } from '../../contexts/profileContext/profileContext';

const ProfileSelector = () => {
    const { profiles, activeProfile, setActiveProfile } = useProfile();

    return (
        <div>
            <h3>Select Profile</h3>
            <p>Current profile: {activeProfile ? activeProfile.Name : "No Profile selected"}</p>
            <ul>
                {profiles.map((profile, index) => (
                    <li key={index}>
                        <button
                            onClick={() => setActiveProfile(profile)}
                            style={{ fontWeight: activeProfile === profile ? 'bold' : 'normal' }}
                        >
                            {profile.Name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileSelector;