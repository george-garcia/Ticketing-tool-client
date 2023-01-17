import './SearchTicketsPage.css'
import {useFetchTicketsQuery} from "../store";
import Table from "../components/Table";
import {useState} from "react";
function SearchTicketsPage(){
    const {data, isLoading} = useFetchTicketsQuery();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading || !data)
        return;

    // console.log(data);

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

    const {tickets} = data;

    function handleData(){
        if(!searchTerm)
            return tickets;

        const newData = tickets.filter(ticket => ticket._id.includes(searchTerm));
        return newData;


    }

    const renderedTable = <Table data={handleData()} config={config} results={15}/>;


    return (
        <div className={"section-search-tickets"}>
            <div className={"search-tickets--heading"}>
                <h2>Search Tickets by ID</h2>
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>

            </div>

            <div>
                {renderedTable}
            </div>

        </div>
    );
}

export default SearchTicketsPage;