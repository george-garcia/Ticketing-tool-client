import './AllTickets.css';
import Table from "../components/Table";
import {useFetchTicketsQuery} from "../store";
import jwtDecode from "jwt-decode";
import {skipToken} from "@reduxjs/toolkit/query";

function AllTickets() {
    const {data: ticketData, error, isLoading} = useFetchTicketsQuery();

    if (isLoading || !ticketData)
        return;

    const token = jwtDecode(localStorage.getItem('token').split(' ')[1]);
    const {userId} = token;

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

    const myTicketData = ticketData.tickets.filter(ticket => {
        return ticket.assigned === userId && ticket.status !== 'Resolved';
    });

    const renderedTable = <Table data={myTicketData} config={config}/>;


    return (
        <div className={"section-all-tickets ticketPage--margins"}>
            <h2 className="dash-heading">Assigned Tickets</h2>
            {renderedTable || <h1>Loading...</h1>}
        </div>
    );
}

export default AllTickets;