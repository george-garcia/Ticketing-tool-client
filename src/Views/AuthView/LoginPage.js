import {useLoginUserMutation} from "../../store";
import {useState, useEffect} from "react";
import {Navigate, useLocation} from "react-router-dom";
import './AuthPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [login, {isLoading, isSuccess}] =  useLoginUserMutation();
    const location = useLocation();
    const [loginSuccess, setLoginSuccess] = useState(false);

    useEffect(() => {
        setErrorMsg("");
    },[email, password]);


    //This is using the AuthPage.css file

    // const {data, error, isLoading} = useFetchUsersQuery();
    // <LoginHook email={email} password={password}/>

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({email, password}).unwrap();

            if(userData?.token){
                localStorage.setItem('token', `Bearer ${userData.token}`);
                setLoginSuccess(true);
                }
        } catch (e) {
            setErrorMsg(e.data.msg);
        }
    }

    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2 className="auth-header">Login Here</h2>
            <input onChange={(e) => setEmail(e.target.value)}
                   value={email} type="text" placeholder="email" className="login-email"/>

            <input onChange={(e) => setPassword(e.target.value)}
                   value={password} type="password" placeholder="password" className="login-password"/>
            <button className="btn-login">Login</button>
            {errorMsg ? <h6>{errorMsg}</h6> : null}
            {!errorMsg && isSuccess ? <h1>Loading dashboard...</h1> : null}
            {loginSuccess && <Navigate to={"/dashboard"} state={{from: location}}/>}
        </form>
    );
}

export default LoginPage;