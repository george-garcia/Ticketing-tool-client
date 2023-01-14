import './NewTicketPage.css';
import Panel from "../../components/Panel";

function NewTicketPage() {
    return (
        <div className={"section-new-ticket"}>
            <div className="new-ticket-panel">

                <p className="label">New Title: </p>
                <input type="text" className="label--value"/>
                <p className="label">New Description:</p>
                <textarea name="" id="" cols="30" rows="10" className="label--value"></textarea>
                <p className="label">Impact:</p>
            </div>
        </div>
    );
}

export default NewTicketPage;