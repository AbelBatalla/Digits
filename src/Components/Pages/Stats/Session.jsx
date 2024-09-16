import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Session.module.css';
import { FaTimes, FaAngleDown, FaTrash } from "react-icons/fa";

const Session = ({ session, isExpanded, onToggleExpand, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this session?')) {
            setIsDeleting(true);
            setTimeout(() => {
                onDelete(session.id);
                setIsDeleting(false);
            }, 500);
        }
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
        <div className={`${styles.session} ${isExpanded ? styles.expanded : ''} ${isDeleting ? styles.deleting : ''}`} onClick={onToggleExpand}>
            <div className={styles.unexpandedSession}>
                <div className={styles.baseData}>
                    <div><strong>Date</strong>
                        <div>{date}</div>
                    </div>
                    <div><strong>Time</strong>
                        <div>{time}</div>
                    </div>
                    <div><strong>Difficulty</strong>
                        <div>{getDifficultyLabel(session.Difficulty)}</div>
                    </div>
                    <div><strong>Average Response Time</strong>
                        <div>{(session.SessionAvgResponseTime / 1000).toFixed(3)}s</div>
                    </div>
                    <div><strong>Correct Answers</strong>
                        <div>{Math.floor(session.SessionCorrectRate)}%</div>
                    </div>
                    <div className={styles.icon}>
                        {isExpanded ? <FaTimes /> : <FaAngleDown />}
                    </div>
                </div>
                <div className={styles.iconTrash} onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                }}><FaTrash /></div>
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
        SessionAvgResponseTime: PropTypes.number.isRequired,
        SessionCorrectRate: PropTypes.number.isRequired,
        runs: PropTypes.arrayOf(PropTypes.shape({
            avgResponseTime: PropTypes.number.isRequired,
            correctRate: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    isExpanded: PropTypes.bool.isRequired, // Now controlled by the parent
    onToggleExpand: PropTypes.func.isRequired, // Passed from the parent to toggle expansion
    onDelete: PropTypes.func.isRequired, // Passed from the parent to delete session
};

export default Session;
