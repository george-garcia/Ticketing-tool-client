import './App.css';
import NavPage from "./pages/NavPage";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {useFetchUsersQuery, useFetchOneUserQuery} from "./store";
import {useRegisterUserQuery} from "./store";
import { createApi } from '@reduxjs/toolkit/query/react'
import {usersApi} from "./store/apis/usersApi";

function App() {
    return (
        <div>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        {/*<Route path="/profile/:userId" element={<ProfilePage/>}/>*/}
                    </Routes>
            </BrowserRouter>
            {/*<NavPage/>*/}

        </div>
    );
}

    // const newUser = {
    //     firstName: "react",
    //     lastName: "test",
    //     email: "react@gmail.com",
    //     password: "secret"
    // };

    // console.log(newUser, person);
    // console.log(newUser);
    // const {data, error, isLoading} = useFetchUsersQuery();
    // const data = useRegisterUserQuery(newUser);
    // const info = useFetchOneUserQuery('63aed8993751e5b44ae8ada2');

    // if(error){
    //     console.log(error);
    // }

    // if(data) {
    //     localStorage.set('token', 'Bearer ' + data.token);
    //     console.log('register user query success and token created');
    // }

    // localStorage.setItem('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2IwZmMyZjE1OWZmNDI1M2M3NzA3MTkiLCJmaXJzdE5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjcyNTY3OTAyLCJleHAiOjE2NzUxNTk5MDJ9.zv4x13rUPxPf5u1ZSBYBvtUUE9EwKBeG20cMvDg7tNE');

    // const useQueryStateResult = usersApi.endpoints.fetchUsers.useQueryState();
    // const query = usersApi.endpoints.fetchUsers.useQueryState();
    // console.log(query);
    // console.log(info);

    // let content;
    // if (isLoading) {
    //     content = <div>Loading...</div>
    // } else if (error) {
    //     content = <div>Error</div>
    // } else {
    //     const {users} = data;
    //     content = users.map(user => {
    //         return (
    //             <div>
    //                 {user.firstName}
    //                 {user.lastName}
    //                 {user.email}
    //             </div>
    //         );
    //     })
    // }




export default App;
