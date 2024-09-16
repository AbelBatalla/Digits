import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext/authContext';
import { signUpEmail } from "../Auth";
import styles from './Register.module.css';

const Register = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            await signUpEmail(email, password);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/'} replace={true} />}

            <main className={styles.mainContainer}>
                <div className={styles.registerBox}>
                    <div className={styles.textCenter}>
                        <h3 className={styles.heading}>Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>

                        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`${styles.submitButton} ${isRegistering ? styles.disabledButton : styles.enabledButton}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className={styles.loginLink}>
                            Already have an account?{' '}
                            <Link to="/login" className={styles.loginLink}>Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
