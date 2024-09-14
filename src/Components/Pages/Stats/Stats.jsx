import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext/authContext';
import { db } from "../../../config/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import Session from './Session';
import styles from './Stats.module.css';
import { FaAngleDown, FaTimes } from "react-icons/fa";

const Stats = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsRef = collection(db, 'Sessions');
                const q = query(sessionsRef, where('UserID', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSessions(sessionsData);
            } catch (err) {
                console.error('Error fetching sessions:', err);
            }
        };

        if (userLoggedIn) {
            fetchSessions();
        }
    }, [userLoggedIn]);

    return (
        <div>
            <h1>Stats</h1>
            {!userLoggedIn && (
                <div className={styles.container}>
                    <p className={styles.p}>
                        <Link to="/login" className={styles.link}>Log in</Link>
                        to view your stats.
                    </p>
                </div>
            )}
            {userLoggedIn && (
                <div>
                    <div className={`${styles.dropdown} ${isExpanded ? styles.expanded : ''}`} onClick={toggleExpand}>
                        <h2> Sessions </h2>
                        <div className={styles.icon}> {isExpanded ? <FaTimes/> : <FaAngleDown/>} </div>
                    </div>
                    <div className={`${styles.containerSessions} ${isExpanded ? styles.expanded : ''}`}>
                        {sessions.map((session, index) => (
                            <Session key={index} session={session} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
