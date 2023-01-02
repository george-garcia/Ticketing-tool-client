import {useLoginUserQuery} from "../store";
import {useRef, useState} from "react";
import './LoginPage.css';

const LoginPage = () => {
    const [getAuth, setAuth] = useState(0);
    const loginRef = useRef(null);
    const registerRef = useRef(null);
    const loginClick = () => {
        setAuth(0);
        if(loginRef.current.classList.contains('auth-selector--active'))
            return
        else {
            loginRef.current.classList.toggle('auth-selector--active');
            registerRef.current.classList.toggle('auth-selector--active');
        }
    }
    const registerClick = () => {
        setAuth(1);
        if(registerRef.current.classList.contains('auth-selector--active'))
            return
        else {
            loginRef.current.classList.toggle('auth-selector--active');
            registerRef.current.classList.toggle('auth-selector--active');
        }
    }

    const loginComponent = () => {
        return (
            <>
                <h2 className="auth-header">Login Here</h2>
                <input type="text" placeholder="email" className="login-email"/>
                <input type="password" placeholder="password" className="login-password"/>
                <button className="btn-login">Login</button>
            </>
        );
    }

    const registerComponent = () => {
        return (
            <>
                <h2 className="auth-header">Register Here</h2>
                <div className="auth-separator">
                    <input className="register--firstname" placeholder="first name" type="text"/>
                    <input className="register--lastname" placeholder="last name" type="text"/>
                </div>

                <input type="text" placeholder="email" />
                <input type="password" placeholder="password" />
            </>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-selector">
                <div ref={loginRef} onClick={loginClick} className="auth-selector--login auth-selector--active">Login</div>
                <div ref={registerRef} onClick={registerClick} className="auth-selector--register">Register</div>
            </div>
            <form className="auth-form">
                {!getAuth ? loginComponent() : registerComponent()}
            </form>
        </div>
    );
}

export default LoginPage;