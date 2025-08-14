import { useLoginUserMutation } from "../../store";
import { useState, useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./AuthPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [login, { isLoading, isSuccess }] = useLoginUserMutation();
  const location = useLocation();
  const [loginSuccess, setLoginSuccess] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    setErrorMsg("");
  }, [email, password]);

  //This is using the AuthPage.css file

  // const {data, error, isLoading} = useFetchUsersQuery();
  // <LoginHook email={email} password={password}/>

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email: email, password }).unwrap();

      if (userData?.token) {
        localStorage.setItem("token", `Bearer ${userData.token}`);
        setLoginSuccess(true);
      }
    } catch (e) {
      setErrorMsg(e.data.msg);
    }
  };

  function onRecruiterLogin() {
    setEmail("recruiter@gmail.com");
    setPassword("supersecretpassword");
  }

  return (
    <form className="auth-form gap-1" onSubmit={onSubmit}>
      <button onClick={onRecruiterLogin} className={"recruiter-btn"}>
        Recruiter Login
      </button>
      <h2 className="auth-header">Login Here</h2>
      <input
        ref={emailRef}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="Email"
        className=""
      />

      <input
        ref={passwordRef}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="Password"
        className="auth--password"
      />
      <button className="btn-login btn">Login</button>
      {errorMsg ? <h6 className={"login-page--error"}>{errorMsg}</h6> : null}
      {!errorMsg && isSuccess ? <h1>Loading dashboard...</h1> : null}
      {loginSuccess && (
        <Navigate to={"/dashboard"} state={{ from: location }} />
      )}
    </form>
  );
};

export default LoginPage;
