import Panel from "./Panel";

const TicketComment = ({ comment }) => {
    return (
        <div className="grid grid-4-cols">
            <Panel className={"ticket-comments-section ticket-margins"} children={
                <>
                    <textarea readOnly value={comment} className="ticket-comments--input"></textarea>
                </>
            }/>
        </div>
    );

}

export default TicketComment;