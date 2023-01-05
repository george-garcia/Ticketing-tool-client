import {useParams} from "react-router-dom";
import {useFetchOneTicketQuery, useFetchUsersQuery} from "../../store";
import './TicketPage.css';
import {useState, useEffect} from "react";
import Dropdown from "../../components/Dropdown";
import Panel from "../../components/Panel";
import TicketComment from "../../components/TicketComment";

const TicketPage = () => {
        const {ticketId} = useParams();
        const {data: ticketData, isLoading: ticketIsLoading, currentData} = useFetchOneTicketQuery(ticketId);
        const {data: userData, isLoading: userDataIsLoading} = useFetchUsersQuery();
        const [ticket, setTicket] = useState({});
        const [ticketCreator, setTicketCreator] = useState({});
        const [ticketAssignedWorker, setTicketAssignedWorker] = useState({});
        const [assignedWorkerSelection, setAssignedWorkerSelection] = useState({});
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [comments, setComments] = useState([]);
        const [newComment, setNewComment] = useState('');

        useEffect(() => {
            //load ticket data

            if (!ticketIsLoading) {
                //set our ticket state object
                setTicket(ticketData.ticket);
            }
        });

        useEffect(() => {
            setTitle(ticket.title);
            setDescription(ticket.description);
            setComments(ticket.comments);

        }, [ticket])


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
        },);

        useEffect(() => {

            if (ticketAssignedWorker?.firstName) {
                const current = {
                    name: `${ticketAssignedWorker.firstName} ${ticketAssignedWorker.lastName}`,
                    id: ticketAssignedWorker._id,
                };

                setAssignedWorkerSelection(current);
            }
        }, [ticketAssignedWorker]);

        //usersData is an array, iterate through this array and return an object { user: name, id: mongoID }

        const handleSelectionState = (option) => {
            setAssignedWorkerSelection(option);
        }

        const renderAssignedUserDropdown = () => {
            console.log(userData.users);
            const usersArr = userData.users.map(user => {
                return {
                    name: `${user.firstName} ${user.lastName}`,
                    id: user._id,
                }
            });


            return <Dropdown options={usersArr} current={assignedWorkerSelection}
                             handleSelectionState={handleSelectionState}/>
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

        let renderComments = 'loading...';
        if(comments) {
            renderComments = comments.map(comment => {
                return <TicketComment key={comment} comment={comment}/>
            });
        }

        console.log(renderComments);

        //submit button, if assignedSelection changes, call update ticket with new assignedworker

        return (
            <div className="section-ticketPage">
                <div className="ticketPage-top grid grid-2-cols">
                    <Panel
                        children={<div className="ticket-user ticketPage-top--styles">
                            {renderCreatorData()}
                        </div>}/>
                    <div className="ticket-assigned ticketPage-top--styles">
                        <h4>Assigned Worker</h4>
                        {userData && renderAssignedUserDropdown()}
                    </div>
                </div>

                <div className="grid grid-2-cols">
                    <Panel className={"ticket-title-section ticket-margins"} children={
                        <>
                            <h4 className="ticket-title mb-1">Title</h4>
                            <textarea onChange={(e) => setTitle(e.target.value)} value={title} className="ticket-title--input"></textarea>
                        </>
                    }/>
                </div>
                <div className="grid grid-3-cols">
                    <Panel className={"ticket-description-section ticket-margins"} children={
                        <>
                            <h4 className="ticket-description mb-1">Description</h4>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="ticket-description--input"></textarea>
                        </>
                    }/>
                </div>
                {renderComments}
                <div className="grid grid-4-cols">
                    <Panel className={"ticket-comments-section ticket-margins"} children={
                        <>
                            <h4 className="ticket-comments mb-1">Add new comment</h4>
                            <textarea className="ticket-comments--input"></textarea>
                        </>
                    }/>
                </div>

            </div>
        );
    }
;

export default TicketPage;