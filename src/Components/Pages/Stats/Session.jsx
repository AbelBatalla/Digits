import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Session.module.css';
import { FaTimes, FaAngleDown } from "react-icons/fa";

const Session = ({ session }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const [date, time] = session.Date.split(', ');

    const getDifficultyLabel = (difficulty) => {
        switch (difficulty) {
            case 2:
                return 'Expert';
            case 1:
                return 'Advanced';
            case 0:
                return 'Standard';
            case -1:
                return 'Kids 2';
            case -2:
                return 'Kids 1';
            case -3:
                return 'Kids 0';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className={`${styles.session} ${isExpanded ? styles.expanded : ''}`} onClick={toggleExpand}>
            <div className={styles['base-data']}>
                <div><strong>Date</strong><div>{date}</div></div>
                <div><strong>Time</strong><div>{time}</div></div>
                <div><strong>Difficulty</strong><div>{getDifficultyLabel(session.Difficulty)}</div></div>
                <div><strong>Average Response Time</strong><div>{(session.SessionAvgResponseTime / 1000).toFixed(3)}s</div></div>
                <div><strong>Correct Answers</strong><div>{Math.floor(session.SessionCorrectRate)}%</div></div>
                <div className={styles.icon}>{isExpanded ? <FaTimes /> : <FaAngleDown />}</div>
            </div>
            <div className={styles.runs}>
                {session.runs.map((run, index) => (
                    <div key={index} className={styles.run}>
                        <p><strong>Run {index + 1}</strong></p>
                        <p><strong>Average Response Time</strong>
                            <div>{(run.avgResponseTime / 1000).toFixed(3)}s</div>
                        </p>
                        <p><strong>Correct Answers</strong>
                            <div>{Math.floor(run.correctRate)}%</div>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

Session.propTypes = {
    session: PropTypes.shape({
        Date: PropTypes.string.isRequired,
        Difficulty: PropTypes.number.isRequired,
        Profile: PropTypes.string.isRequired,
        SessionAvgResponseTime: PropTypes.number.isRequired,
        SessionCorrectRate: PropTypes.number.isRequired,
        UserID: PropTypes.string.isRequired,
        runs: PropTypes.arrayOf(PropTypes.shape({
            avgResponseTime: PropTypes.number.isRequired,
            correctRate: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
};

export default Session;