import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext/authContext';
import { db } from "../../../config/firebase";
import { collection, getDocs, where, query, deleteDoc, doc } from "firebase/firestore";
import Session from './Session';
import styles from './Stats.module.css';
import { FaAngleDown, FaTimes } from "react-icons/fa";

const Stats = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [expandedSessions, setExpandedSessions] = useState([]); // Array to track expanded session IDs
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleSessionExpand = (sessionId) => {
        if (expandedSessions.includes(sessionId)) {
            setExpandedSessions(expandedSessions.filter(id => id !== sessionId)); // Collapse session
        } else {
            setExpandedSessions([...expandedSessions, sessionId]); // Expand session
        }
    };

    const parseDate = (dateString) => {
        const [datePart, timePart] = dateString.split(', ');
        const [day, month, year] = datePart.split('/').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);

        return new Date(year, month - 1, day, hours, minutes, seconds); // JavaScript months are 0-based
    };

    const handleDelete = async (id) => {
        setSessions(sessions.filter(session => session.id !== id));
        setExpandedSessions(expandedSessions.filter(sessionId => sessionId !== id));
        console.log('Delete session:', id);
        // Uncomment this to enable actual deletion from Firestore
        // try {
        //     await deleteDoc(doc(db, 'Sessions', id));
        // } catch (err) {
        //     console.error('Error deleting session:', err);
        // }
    };

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsRef = collection(db, 'Sessions');
                const q = query(sessionsRef, where('UserID', '==', currentUser.uid));
                const querySnapshot = await getDocs(q);
                const sessionsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                sessionsData.sort((a, b) => {
                    const dateA = parseDate(a.Date);
                    const dateB = parseDate(b.Date);
                    return dateB - dateA; // Newest to oldest
                });

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
                        {sessions.map((session) => (
                            <Session
                                key={session.id}
                                session={session}
                                isExpanded={expandedSessions.includes(session.id)} // Check if the session is expanded
                                onToggleExpand={() => toggleSessionExpand(session.id)} // Toggle expansion
                                onDelete={() => handleDelete(session.id)} // Pass session ID to delete
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
