import {useParams} from "react-router-dom";
import {useFetchOneTicketQuery, useFetchUsersQuery} from "../../store";
import './TicketPage.css';
import {useState, useEffect} from "react";

const TicketPage = () => {
    const {ticketId} = useParams();
    const {data, isError, isLoading} = useFetchOneTicketQuery(ticketId);
    const [ticket, setTicket] = useState({});

    useEffect(() => {
        if(!isLoading)
            setTicket(data.ticket);
    }, [data]);

    console.log(ticket);

    return (
        <div className="section-ticketPage">
            <div className="ticketPage-top grid grid-2-cols">
                <div className="ticket-user ticketPage-top--styles">
                    User Info
                </div>
                <div className="ticket-assigned ticketPage-top--styles">Assigned worker</div>
            </div>
        </div>
    );
};

export default TicketPage;