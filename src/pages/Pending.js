import './AllTickets.css';
import Table from "../components/Table";
import {useFetchTicketsQuery} from "../store";

function AllTickets() {
    const {data: ticketData, error, isLoading} = useFetchTicketsQuery();


    if (isLoading || !ticketData)
        return;

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

    const pendingTicketData = ticketData.tickets.filter(ticket => {
        return ticket.status === 'Pending';
    });

    const renderedTable = <Table data={pendingTicketData} config={config}/>;


    return (
        <div className={"section-all-tickets ticketPage--margins"}>
            <h2 className="dash-heading">Pending Tickets</h2>
            {renderedTable || <h1>Loading...</h1>}
        </div>
    );
}

export default AllTickets;