import NavPage from "../../pages/NavPage";
import {useFetchUsersQuery, useFetchTicketsQuery} from "../../store";
import {Link} from "react-router-dom";
import Table from '../../components/Table';
import './DashboardPage.css';

const DashboardPage = () => {

    const {data, error, isLoading} = useFetchTicketsQuery();
    console.log(data);
    let renderedTickets;
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

    if (data) {
        renderedTable = <Table data={data.tickets} config={config}/>;
    }


    return (
        <div className="section-dashboard">
            <h2 className="dash-heading">Dashboard Page</h2>
            <p className="dash-subheading">View all tickets</p>
            {renderedTable || <h1>Loading...</h1>}
        </div>
    );
}

export default DashboardPage;