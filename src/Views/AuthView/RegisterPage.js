const RegisterPage = () => {

    //This is using the AuthPage.css file


    const onSubmit = (e) => {
        e.preventDefault();
        console.log('test');
    }


    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h2 className="auth-header">Register Here</h2>
            <div className="auth-separator">
                <input className="register--firstname" placeholder="first name" type="text"/>
                <input className="register--lastname" placeholder="last name" type="text"/>
            </div>
            <input type="text" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <button className="btn-register btn">Register</button>
        </form>
    );
}

export default RegisterPage;