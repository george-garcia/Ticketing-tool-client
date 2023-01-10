import Panel from "./Panel";
import './TicketComment.css';

const TicketComment = ({comment}) => {

    const seconds = Date.parse(comment.createdAt);
    const date = new Date(seconds);

    const user = comment.createdBy;

    let firstName = user.split(' ')[0];
    let lastName = user.split(' ')[1];

    firstName = firstName[0].toUpperCase() + firstName.slice(1);
    lastName = lastName[0].toUpperCase() + lastName.slice(1);
    const fullName = `${firstName} ${lastName}`;


    return (
        <div className="">
            <Panel className={""} children={
                <>
                    <div className="comment-container">
                        <div className="comment-title--container">
                            <p className="comment--comment"> <span className="comment--name">{fullName}</span> left a comment</p>
                        </div>
                        <p>{date.toLocaleString()}</p>
                    </div>
                    <p className="comment-detail">{comment.comment}</p>
                </>
            }/>
        </div>
    );

}

export default TicketComment;