import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';


export default function NotFoundPage() {
    return (
        <div className={styles.NotFoundPage}>
            404 Not Found
            <Link to="/">Home</Link>
        </div>
    );
}