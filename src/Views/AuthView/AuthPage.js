import {useRef, useState} from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import './AuthPage.css';

const AuthPage = () => {
    const [getAuthView, setAuthView] = useState('login');
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const loginClick = () => {
        setAuthView('login');
        if (loginRef.current.classList.contains('auth-selector--active'))
            return
        else {
            loginRef.current.classList.toggle('auth-selector--active');
            registerRef.current.classList.toggle('auth-selector--active');
        }
    }
    const registerClick = () => {
        setAuthView('register');
        if (registerRef.current.classList.contains('auth-selector--active'))
            return
        else {
            loginRef.current.classList.toggle('auth-selector--active');
            registerRef.current.classList.toggle('auth-selector--active');
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-selector">
                <div ref={loginRef} onClick={loginClick} className="auth-selector--login auth-selector--active">Login
                </div>
                <div ref={registerRef} onClick={registerClick} className="auth-selector--register">Register</div>
            </div>
            {(getAuthView === 'login') ? <LoginPage/> : <RegisterPage/>}
        </div>
    );
}

export default AuthPage;