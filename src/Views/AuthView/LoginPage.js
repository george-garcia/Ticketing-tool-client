import {useLoginUserMutation} from "../../store";
import {useState, useEffect} from "react";
import './AuthPage.css';
import LoginHook from "./LoginHook";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [login, {isLoading, isSuccess}] =  useLoginUserMutation();

    useEffect(() => {
        setErrorMsg("");
    },[email, password])


    //This is using the AuthPage.css file

    // const {data, error, isLoading} = useFetchUsersQuery();
    // <LoginHook email={email} password={password}/>

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({email, password}).unwrap();
        } catch (e) {
            setErrorMsg(e.data.msg);
        }
        //if not userdata we can display a login failed message

        //if userdata success we route to dashboard
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
        </form>
    );
}

export default LoginPage;