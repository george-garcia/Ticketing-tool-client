import './AssignedPage.css';
import {useFetchOneTicketQuery, useFetchUsersQuery} from "../../store";
import {useEffect, useState} from "react";
import Panel from "../../components/Panel";

function AssignedPage({ ticketId }) {
    const {data: ticketData, isLoading: ticketIsLoading} = useFetchOneTicketQuery(ticketId);
    const {data: usersData, isLoading: usersIsLoading} = useFetchUsersQuery();

    const [ticket, setTicket] = useState({});
    const [assigned, setAssigned] = useState({});

    useEffect(() => {
        // load ticket data

        if (!ticketIsLoading) {
            //set our ticket state object
            setTicket(ticketData.ticket);
        }
    });

    useEffect(() => {

        if (ticket?.assigned && !usersIsLoading) {

            for (const user of usersData.users) {
                if (ticket.assigned === user._id) {
                    const assignedObject = {...user};

                    let firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
                    let lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1);
                    const fullName = `${firstName} ${lastName}`;

                    assignedObject.name = fullName;

                    setAssigned(assignedObject);
                }
            }
        } else {
            setAssigned(null);
        }
    }, [ticket]);

    console.log(assigned);



    function renderAssignedInfo(){
        return (
            <div>
                <p className="ticket-properties--label"> Name</p>
                <p className="ticket-properties--value">{assigned.name}</p>
                <p className="ticket-properties--label"> Email</p>
                <p className="ticket-properties--value">{assigned.email}</p>
                <p className="ticket-properties--label"> Hours</p>
                <p className="ticket-properties--value">{'9AM - 5PM CST'}</p>
                <p className="ticket-properties--label"> Team</p>
                <p className="ticket-properties--value">{'Developers'}</p>
                <p className="ticket-properties--label"> Position</p>
                <p className="ticket-properties--value">{'Lv 1 Developer'}</p>
            </div>
        );
    }

    /*

    Name
    Email
    Hours
    Team
    Position

    If none is assigned we'll put a blurb about how we handle tickets ourtside of work hours
    conditional rendering

     */


    return (
        <div className="ticket-properties">
            <h3 className="ticket-properties--header">ASSIGNED</h3>
            {assigned?.name ? renderAssignedInfo() : 'none assigned'}
        </div>
    );
}

export default AssignedPage;