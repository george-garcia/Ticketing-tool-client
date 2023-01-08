import Panel from "./Panel";
import './TicketComment.css';

const TicketComment = ({comment}) => {

    const seconds = Date.parse(comment.createdAt);
    const date = new Date(seconds);



    return (
        <div className="">
            <Panel className={""} children={
                <>
                    <div className="comment-container">
                        <div className="comment-title--container">
                            <p className="">Comment</p>
                            <p>{comment.createdBy}</p>
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