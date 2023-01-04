import {useParams} from "react-router-dom";
import {useFetchOneTicketQuery, useFetchUsersQuery} from "../../store";
import './TicketPage.css';
import {useState, useEffect} from "react";
import Dropdown from "../../components/Dropdown";

const TicketPage = () => {
        const {ticketId} = useParams();
        const {data: ticketData, isLoading: ticketIsLoading, currentData} = useFetchOneTicketQuery(ticketId);
        const {data: userData, isLoading: userDataIsLoading} = useFetchUsersQuery();
        const [ticket, setTicket] = useState({});
        const [ticketCreator, setTicketCreator] = useState({});
        const [ticketAssignedWorker, setTicketAssignedWorker] = useState({});
        const [assignedWorkerSelection, setAssignedWorkerSelection] = useState();

        const handleSelection = (option) => {
            setAssignedWorkerSelection(option);
        }

        useEffect(() => {
            //load ticket data

            if (!ticketIsLoading) {
                //set our ticket state object
                setTicket(ticketData.ticket);
            }
        });

        useEffect(() => {
            // load user data
            if (!userDataIsLoading && !ticketIsLoading) {
                //get ticket creator and assigned work if they exist
                const creatorId = ticket.createdBy;
                const assignedId = ticket?.assigned ? ticket.assigned : null;
                //get users array out of our data
                const {users} = userData;
                //search our users array for ticketcreator and assignee
                users.forEach(user => {
                    // if we find the person who created the ticket, put their object in local state
                    if (user._id === creatorId) {
                        setTicketCreator(user);
                    }
                    // if we find the person assigned to work the ticket, put their object in local state
                    if (assignedId && user._id === assignedId) {
                        setTicketAssignedWorker(user);
                    }
                });
            }
        },)

        //usersData is an array, iterate through this array and return an object { user: name, id: mongoID }

        const renderAssignedUserDropdown = () => {
            const usersArr = userData.users.map(user => {
                return {
                    name: `${user.firstName} ${user.lastName}`,
                    id: user._id,
                }
            });

            //currently assigned worker
            const current = {
                name: `${ticketAssignedWorker.firstName} ${ticketAssignedWorker.lastName}`,
                id: ticketAssignedWorker._id,
            };

            setAssignedWorkerSelection(current);

            return <Dropdown options={usersArr} current={current}/>
        };

//display user info on screen
        const renderCreatorData = () => {
            return (
                <>
                    <p>Name: {ticketCreator.firstName} {ticketCreator.lastName}</p>
                    <p>User ID: {ticketCreator._id}</p>
                    <p>Email: {ticketCreator.email}</p>
                    <p>Contact: </p>
                </>
            );
        };

        //submit button, if assignedSelection changes, call update ticket with new assignedworker

        return (
            <div className="section-ticketPage">
                <div className="ticketPage-top grid grid-2-cols">
                    <div className="ticket-user ticketPage-top--styles">
                        {ticket?._id && renderCreatorData()}
                    </div>
                    <div className="ticket-assigned ticketPage-top--styles">
                        Assigned worker
                        {userData && renderAssignedUserDropdown()}
                    </div>
                </div>
            </div>
        );
    }
;

export default TicketPage;