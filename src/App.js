import './App.css';
import DashboardPage from "./Views/DashboardView/DashboardPage";
import {BrowserRouter, Routes, Route, renderMatches} from "react-router-dom";
import AuthPage from "./Views/AuthView/AuthPage";
import TicketPage from "./Views/TicketView/TicketPage";
import AllTickets from "./pages/AllTickets";
import OpenTickets from "./pages/OpenTickets";
import RegisterPage from "./Views/AuthView/RegisterPage";
import {useFetchUsersQuery, useFetchOneUserQuery} from "./store";
import {useRegisterUserQuery} from "./store";
import {createApi} from '@reduxjs/toolkit/query/react'
import {usersApi} from "./store/apis/usersApi";
import NavPage from "./pages/NavPage";
import AssignedTickets from "./pages/AssignedTickets";
import InProgress from "./pages/InProgress";
import Pending from "./pages/Pending";
import MyOpenTickets from "./pages/MyOpenTickets";
import NewTicketPage from "./Views/NewTicketView/NewTicketPage";
import SearchTicketsPage from "./pages/SearchTicketsPage";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthPage/>}/>
                    <Route path="/dashboard" element={
                        <>
                            <NavPage children={<DashboardPage/>} />
                        </>
                    }/>
                    <Route path="/all-tickets" element={
                        <>
                            <NavPage children={<AllTickets/>} />
                        </>
                    }/>
                    <Route path="/open-tickets" element={<NavPage children={<OpenTickets/>} />}/>
                    <Route path="/assigned-tickets" element={<NavPage children={<AssignedTickets/>} />}/>
                    <Route path="/in-progress-tickets" element={<NavPage children={<InProgress/>} />}/>
                    <Route path="/pending-tickets" element={<NavPage children={<Pending/>} />}/>
                    <Route path="/my-open-tickets" element={<NavPage children={<MyOpenTickets/>} />}/>
                    <Route path="/new-ticket" element={<NavPage children={<NewTicketPage/>} />}/>
                    <Route path="/search-tickets" element={<NavPage children={<SearchTicketsPage/>} />}/>
                    {/*<Route path="/login" element={<LoginHook/>}/>*/}
                    <Route path="/tickets/:ticketId" element={
                        <>
                            <NavPage children={<TicketPage/>} />
                        </>
                    }/>
                </Routes>
            </BrowserRouter>
            {/*<NavPage/>*/}

        </div>
    );
};

export default App;
