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
    const [acceptPolicy, setAcceptPolicy] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        if (!acceptPolicy) {
            setErrorMessage('You must be 18 or older and accept the Privacy Policy to register.');
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            const result = await signUpEmail(email, password);
            if (result === 0) {
                return;
            }
            else if (result === 1) {
                setErrorMessage("This email is already in use.");
            } else if (result === 2) {
                setErrorMessage("Invalid email format.");
            } else if (result === 3) {
                setErrorMessage("The password is too weak. 6 characters minimum.");
            } else {
                setErrorMessage("Error during sign-up.");
            }
            setIsRegistering(false);
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
                                minLength="6"
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
                                minLength="6"
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>

                        <div className={styles.privacyContainer}>
                            <input
                                type="checkbox"
                                id="acceptPolicy"
                                checked={acceptPolicy}
                                onChange={(e) => setAcceptPolicy(e.target.checked)}
                                className={styles.checkbox}
                            />
                            <label htmlFor="acceptPolicy">
                                I am 18 or older and accept the <a href="/privacyPolicy.html" target="_blank"
                                                                   rel="noopener noreferrer" className={styles.loginLink}>Privacy Policy</a>.
                            </label>
                        </div>
                        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}

                            <button
                                type="submit"
                                disabled={isRegistering}
                                className={`${styles.submitButton} ${isRegistering ? styles.disabledButton : styles.enabledButton}`}
                            >
                                {isRegistering ? 'Signing Up...' : 'Sign Up'}
                            </button>

                            <div className={styles.loginLinkContainer}>
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
