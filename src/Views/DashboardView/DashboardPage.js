import {useFetchTicketsQuery} from "../../store";
import Table from '../../components/Table';
import './DashboardPage.css';
import Pie from "./Pie";
import Panel from "../../components/Panel";
import jwtDecode from "jwt-decode";
import {useState, useEffect} from "react";
import {skipToken} from "@reduxjs/toolkit/query";

const DashboardPage = () => {

    const {data: ticketData, error, isLoading} = useFetchTicketsQuery();
    const [myTickets, setMyTickets] = useState(0);
    const [overdueTickets, setOverdueTickets] = useState(0);

    useEffect(() => {
        if (!ticketData || isLoading)
            return;

        const token = localStorage.getItem('token').split(' ')[1];
        const decoded = jwtDecode(token);

        const {tickets} = ticketData;
        const {userId} = decoded;

        setMyTickets(0);
        setOverdueTickets(0);

        tickets.forEach(ticket => {

            const currentSeconds = Date.now();
            const ticketSeconds = Date.parse(ticket.createdAt);

            const secondsInOneHour = 3600;

            if (ticket.status !== 'Resolved' && ticket.status !== 'Closed') {
                if (currentSeconds - ticketSeconds > (secondsInOneHour * 2))
                    setOverdueTickets(state => state + 1);
            }

            //set usertickets var
            if (ticket.assigned === userId && ticket.status !== 'Resolved' && ticket.status !== 'Closed') {
                setMyTickets((state) => state + 1);
            }
        });
    }, [ticketData]);

    let renderedTable;

    const config = [
        {label: 'Ticket ID',}, {
            label: 'Title',
        }, {
            label: 'Description',
        }, {
            label: 'Priority',
        }, {
            label: 'Status',
        },];

    const token = jwtDecode(localStorage.getItem('token').split(' ')[1]);
    const {userId} = token;

    if (!ticketData || isLoading)
        return;

    const myTicketData = ticketData.tickets.filter(ticket => {
        return ticket.assigned === userId && ticket.status !== 'Resolved';
    });

    renderedTable = <Table data={myTicketData} config={config} results={5}/>;

    if (isLoading || !ticketData)
        return;

    let open, assigned, pending, inProgress, minor, major, critical;
    open = assigned = pending = inProgress = minor = major = critical = 0;

    // const token = localStorage.getItem('token').split(' ')[1];
    // const decoded = jwtDecode(token);
    //
    // const {tickets} = ticketData;
    // const {userId} = decoded;

    ticketData.tickets.forEach(ticket => {

        // const currentSeconds = Date.now();
        // const ticketSeconds = Date.parse(ticket.createdAt);
        //
        // const secondsInOneHour = 3600;
        //
        // if(ticket.status !== 'Resolved' && ticket.status !== 'Closed') {
        //     if (currentSeconds - ticketSeconds > (secondsInOneHour * 2))
        //         overdue += 1;
        // }
        //
        // //set usertickets var
        // if (ticket.assigned === userId && ticket.status !== 'Resolved' && ticket.status !== 'Closed') {
        //     myTickets += 1;
        // }

        switch (ticket.priority) {
            case 'Minor':
                minor += 1;
                break;
            case 'Major':
                major += 1;
                break;
            case 'Critical':
                critical += 1;
                break;
            default:
                break;
        }

        switch (ticket.status) {
            case 'Open':
                open += 1;
                break;
            case 'Assigned':
                assigned += 1;
                break;
            case 'Pending':
                pending += 1;
                break;
            case 'In progress':
                inProgress += 1;
                break;
            default:
                break;
        }
    });

    const dataStatus = [
        {
            "id": "Open",
            "label": "Open",
            "value": open,
            "color": "#86efac",

        },
        {
            "id": "Assigned",
            "label": "Assigned",
            "value": assigned,
            "color": "#2338DC",
        },
        {
            "id": "Pending",
            "label": "Pending",
            "value": pending,
            "color": "#DCC723"
        },
        {
            "id": "In progress",
            "label": "In progress",
            "value": inProgress,
            "color": "#f9a8d4"
        },
    ];

    const dataPriority = [
        {
            "id": "Minor",
            "label": "Minor",
            "value": minor,
            "color": "#86efac",

        },
        {
            "id": "Major",
            "label": "Major",
            "value": major,
            "color": "#f9a8d4",
        },
        {
            "id": "Critical",
            "label": "Critical",
            "value": critical,
            "color": "red"
        },
    ];

    function renderOpenTickets() {
        return open + assigned + pending + inProgress;
    }

    return (
        <div className="section-dashboard">
            <h2 className="dash-heading">Dashboard Page</h2>

            <div className="dashboard-pie-section">
                <Panel className={"dashboard-notifications--my"} children={
                    <>
                        <h3>My Tickets</h3>
                        <h1>{myTickets}</h1>
                    </>
                }/>
                <Panel className={"dashboard-notifications--open"} children={
                    <>
                        <h3>All Open </h3>
                        <h1>{renderOpenTickets()}</h1>
                    </>
                }/>
                <Panel className={"dashboard-notifications--overdue"} children={
                    <>
                        <h3>Overdue</h3>
                        <h1>{overdueTickets}</h1>
                    </>
                }/>
                <Panel className={"dashboard-notifications--unassigned"} children={
                    <>
                        <h3>Unassigned</h3>
                        <h1>{open}</h1>
                    </>
                }/>
                <Panel className={"pie-container--status"} children={
                    <>
                        <h2>Open requests by Status</h2>
                        <Pie data={dataStatus}/>
                    </>
                }
                />
                <Panel className={"pie-container--priority"} children={
                    <>
                        <h2>Open requests by Priority</h2>
                        <Pie data={dataPriority}/>
                    </>
                }
                />
            </div>
            <p className="dash-subheading">My Tickets</p>
            {renderedTable || <h1>Loading...</h1>}
        </div>
    );
}

export default DashboardPage;