import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { loginEmail, logout, loginGoogle, passwordReset, signUpEmail } from "../Auth";
import { useAuth } from "../../../contexts/authContext/authContext";
import { FcGoogle } from "react-icons/fc";
import styles from './Login.module.css';


const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            const result = await loginEmail(email, password);
            if (result === 0) {}
            else if (result === 'auth/invalid-credential') {
                setErrorMessage("Invalid email or password.");
                setIsSigningIn(false);
            }
            else {
                setErrorMessage("Error during sign-in.");
                setIsSigningIn(false);
            }
        }
    };


    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            await loginGoogle().catch(err => {
                setIsSigningIn(false);
            });
            setIsSigningIn(false);
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/'} replace={true} />}

            <main className={styles.mainContainer}>
                <div className={styles.loginBox}>
                    <div className={styles.textCenter}>
                        <div className="mt-2">
                            <h3 className={styles.heading}>Welcome Back</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
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
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputField}
                            />
                        </div>

                        {errorMessage && (
                            <span className={styles.errorMessage}>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`${styles.submitButton} ${isSigningIn ? styles.disabledButton : styles.enabledButton}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm">
                        Don't have an account? <Link to="/Register" className="hover:underline font-bold">Sign up</Link>
                    </p>

                    <div className={styles.orDivider}>
                        <div className={styles.dividerLine}></div>
                        <div className='text-sm font-bold'>OR</div>
                        <div className={styles.dividerLine}></div>
                    </div>

                    <button
                        disabled={isSigningIn}
                        onClick={(e) => onGoogleSignIn(e)}
                        className={styles.googleButton}
                    >
                        <FcGoogle size={25} />
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </>
    );
}

export default Login;
