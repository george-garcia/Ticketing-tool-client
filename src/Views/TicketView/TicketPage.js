import {useParams} from "react-router-dom";
import {
    useFetchOneTicketQuery,
    useFetchUsersQuery,
    useAddNewCommentMutation,
    useUpdateTicketMutation
} from "../../store";
import './TicketPage.css';
import {useState, useEffect} from "react";
import Panel from "../../components/Panel";
import TicketComment from "../../components/TicketComment";
import PropertiesPage from "./PropertiesPage";
import AssignedPage from "./AssignedPage";

const TicketPage = () => {
        const {ticketId} = useParams();
        const {data: ticketData, isLoading: ticketIsLoading, currentData} = useFetchOneTicketQuery(ticketId);
        const {data: userData, isLoading: userDataIsLoading} = useFetchUsersQuery();

        const [updateComment] = useAddNewCommentMutation();
        const [updateTicket] = useUpdateTicketMutation();

        const [ticket, setTicket] = useState({});
        const [customer, setCustomer] = useState({});
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

                        setCustomer(user);
                    }
                    // if we find the person assigned to work the ticket, put their object in local state
                });
            }
        },);

        let renderComments = 'loading...';
        if (comments) {
            renderComments = comments.map(comment => {
                return <TicketComment key={comment._id} comment={comment}/>
            });
        }


        async function addNewComment() {
            if (newComment) {
                //this should create an object comment with comment.ticketId and comment.body values
                //then call the mutation with this object
                const comment = {
                    ticketId: ticket._id,
                    body: {
                        comments: newComment
                    }
                };
                await updateComment(comment).unwrap();
                setNewComment('');
            }
        }

        function renderCustomerFullName(){

            if(!customer?.firstName)
                return;

            const firstName = customer.firstName[0].toUpperCase() + customer.firstName.slice(1);
            const lastName = customer.lastName[0].toUpperCase() + customer.lastName.slice(1);
            const fullName = `${firstName} ${lastName}`;

            return fullName;
        }



        return (
            <div className="section-ticketPage">

                <div className="ticketPage-container">
                    <div className="ticketPage-left--container">
                        <Panel className={"ticket-description-section"} children={
                            <>
                                <div className="ticket-title-section">
                                    <input onChange={(e) => setTitle(e.target.value)} value={title || ""}
                                           className="ticket-title--input"></input>
                                    <div className="ticket-container--time">
                                        <p><span>{renderCustomerFullName()}</span> reported an issue</p>
                                        <p>4 hours ago</p>
                                    </div>
                                </div>

                                <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                                          className="ticket-description--input"></textarea>
                            </>
                        }/>

                        {renderComments}

                        <Panel className={"ticket-comments-section"} children={
                            <>
                                <div className="newComment-container">
                                    <h4 className="ticket-comments">Add new comment</h4>
                                    <button className="btn" onClick={addNewComment}>Save new comment</button>
                                </div>
                                <textarea onChange={(e) => setNewComment(e.target.value)} value={newComment}
                                          className="ticket-comments--input"></textarea>
                            </>
                        }/>

                    </div>

                    <PropertiesPage ticketId={ticketId}/>

                    <AssignedPage ticketId={ticketId}/>
                </div>


            </div>
        );
    }
;

export default TicketPage;