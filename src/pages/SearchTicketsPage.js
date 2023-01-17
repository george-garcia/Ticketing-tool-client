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

    function handleSubmit(e){
        e.preventDefault();
    }

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

    const renderedTable = <Table data={handleData()} config={config}/>;


    return (
        <div className={"section-search-tickets"}>
            <form onSubmit={e => handleSubmit(e)}>
                <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                <p>Search Tickets by ID</p>
            </form>

            <div>
                {renderedTable || <h1>Loading...</h1>}
            </div>

        </div>
    );
}

export default SearchTicketsPage;