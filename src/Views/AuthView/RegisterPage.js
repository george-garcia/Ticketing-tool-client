import {useState, useEffect} from "react";
import {useRegisterUserMutation} from "../../store";
import {useLocation, Navigate} from "react-router-dom";

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('');

    const [lastName, setLastName] = useState('');
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('');

    const [email, setEmail] = useState('');
    const [emailErrorMsg, setEmailErrorMsg] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

    const [registerUser, result] = useRegisterUserMutation();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const location = useLocation();



    useEffect(() => {
        setFirstNameErrorMsg('');
        setLastNameErrorMsg('');
        setEmailErrorMsg('');
        setPasswordErrorMsg('');
        setErrorMsg('');
    }, [firstName, lastName, email, password, errorMsg])


    //This is using the AuthPage.css file


    const onSubmit = async (e) => {
        e.preventDefault();
        const queryObject = {};

        if (firstName.length < 3 || firstName.length > 20) {
            setFirstNameErrorMsg('Please enter a first name between 3 and 20 characters');
            return;
        }

        queryObject.firstName = firstName;

        if (lastName.length < 3 || lastName.length > 20) {
            setFirstNameErrorMsg('Please enter a last name between 3 and 20 characters');
            return;
        }

        queryObject.lastName = lastName;

        // const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regex)) {
            setEmailErrorMsg('Please enter a valid email address');
            return
        }
        queryObject.email = email;

        if(password.length < 6){
            setPasswordErrorMsg('Please enter a password greater than 5 characters');
            return;
        }

        queryObject.password = password;

        try {

            const newUser = await registerUser(queryObject).unwrap();

            if(newUser?.token){
                localStorage.setItem('token', `Bearer ${newUser.token}`);
                setLoginSuccess(true);
            }
        } catch (e) {
            setErrorMsg(e.data.msg);
        }

    }


    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2 className="auth-header">Register Here</h2>
            <div className="auth-separator">
                <input className="register--firstname" placeholder="First Name" type="text"
                       value={firstName} onChange={e => setFirstName(e.target.value)}/>
                {firstNameErrorMsg ? <h6 className={"register-page--error"}>{firstNameErrorMsg}</h6> : null}

                <input className="register--lastname" placeholder="Last Name" type="text"
                       value={lastName} onChange={e => setLastName(e.target.value)}/>
                {lastNameErrorMsg ? <h6 className={"register-page--error"}>{lastNameErrorMsg}</h6> : null}

            </div>
            <input type="text" placeholder="Email"
                   value={email} onChange={e => setEmail(e.target.value)}/>
            {emailErrorMsg ? <h6 className={"register-page--error"}>{emailErrorMsg}</h6> : null}


            <input type="password" placeholder="Password" className={"mb-1--2"}
                   value={password} onChange={e => setPassword(e.target.value)}/>
            {passwordErrorMsg ? <h6 className={"register-page--error"}>{passwordErrorMsg}</h6> : null}

            <button className="btn-register btn">Register</button>
            {errorMsg ? <h6 className={"login-page--error"}>{errorMsg}</h6> : null}

            {loginSuccess && <Navigate to={"/dashboard"} state={{from: location}}/>}

        </form>
    );
}

export default RegisterPage;