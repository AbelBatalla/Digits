// src/contexts/profileContext/profileContext.jsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import { db } from '../../config/firebase';
import { useAuth } from '../authContext/authContext';
import {doc, setDoc, updateDoc, getDoc, collection, query, where, getDocs, deleteDoc} from 'firebase/firestore';

const ProfileContext = createContext();

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({ children }) {
    const { userLoggedIn, currentUser } = useAuth();
    const [profiles, setProfiles] = useState([]);
    const [activeProfile, setActiveProfile] = useState(null);

    useEffect(() => {
        console.log("Here4");
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
                if (!activeProfileName) return;
                const activeProfileRef = doc(db, 'Users', currentUser.uid, 'Profiles', activeProfileName);
                const activeProfileSnap = await getDoc(activeProfileRef);
                setActiveProfile(activeProfileSnap.data());
            }
            fetchActiveProfile().then(r => {});
            fetchUserProfiles().then(r => {});
            console.log("Here5");
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
            setProfiles(newProfiles); //ONLY ON SUCESS
            setActiveProfileInDb(profileData); //ONLY ON SUCESS
            console.log("Profile created successfully");
        }
    };

    const setActiveProfileInDb = async (profileData) => {
        if (userLoggedIn) {
            const profileRef = doc(db, 'Users', currentUser.uid);
            const activeValue = profileData ? profileData.Name : null;
            await updateDoc(profileRef, { activeProfile: activeValue});
            setActiveProfile(profileData);
        }
        console.log("Active profile set successfully");
    };

    const deleteProfile = async (profileName) => {
        if (userLoggedIn) {
            const newProfiles = profiles.filter(p => p.Name !== profileName);
            await deleteDoc(doc(db, "Users", currentUser.uid, "Profiles", profileName));
            setProfiles(newProfiles);
            if (activeProfile && activeProfile.Name === profileName) {
                if (newProfiles.length === 0) {
                    await setActiveProfileInDb(null);
                }
                else {
                    await setActiveProfileInDb(newProfiles[0]);
                }
            }
        }
    }

    const value = {
        profiles,
        activeProfile,
        createProfile,
        setActiveProfile: setActiveProfileInDb,
        deleteProfile
    };

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}