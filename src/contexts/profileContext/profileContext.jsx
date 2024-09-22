// src/contexts/profileContext/profileContext.jsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../authContext/authContext';
import {doc, setDoc, updateDoc, getDoc, collection, query, where, getDocs} from 'firebase/firestore';

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const { userLoggedIn, currentUser } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [activeProfile, setActiveProfile] = useState(null);

    useEffect(() => {
        if (userLoggedIn) {
            const fetchUserProfiles = async () => {
                try {
                    const profilesCollectionRef = collection(db, "Users", currentUser.uid, "Profiles");
                    const q = query(profilesCollectionRef, where('UserID', '==', currentUser.uid));
                    const querySnapshot = await getDocs(q);
                    setProfiles(querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })));
                } catch (error) {
                    console.error("Error fetching profiles:", error);
                }
            };
            const fetchActiveProfile = async () => {
                const userRef = doc(db, 'Users', currentUser.uid);
                const userSnap = await getDoc(userRef);
                const activeProfileName = userSnap.data().activeProfile;
                const activeProfileRef = doc(db, 'Users', currentUser.uid, 'Profiles', activeProfileName);
                const activeProfileSnap = await getDoc(activeProfileRef);
                setActiveProfile(activeProfileSnap.data());
            }
            fetchActiveProfile();
            fetchUserProfiles();
        }
        else {
            setProfiles([]);
            setActiveProfile(null);
        }
    }, [userLoggedIn]);

    const createProfile = async (profileData) => {
        if (userLoggedIn) {
            const newProfiles = [...profiles, profileData];
            await setDoc(doc(db, "Users", currentUser.uid, "Profiles", profileData.Name), profileData);
            setProfiles(newProfiles);
            setActiveProfile(profileData);
            console.log("Profile created successfully");
        }
    };

    const setActiveProfileInDb = async (profileData) => {
        if (userLoggedIn) {
            const profileRef = doc(db, 'Users', currentUser.uid);
            await updateDoc(profileRef, { activeProfile: profileData.Name });
            setActiveProfile(profileData);
        }
        console.log("Active profile set successfully");
    };

    const value = {
        profiles,
        activeProfile,
        createProfile,
        setActiveProfile: setActiveProfileInDb,
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}