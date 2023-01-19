import './NewTicketPage.css';
import {useEffect, useState} from "react";
import Dropdown from "../../components/Dropdown";
import {useCreateTicketMutation} from "../../store";

function NewTicketPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [impact, setImpact] = useState({value: 'Low'});
    const [titleErrorMsg, setTitleErrorMsg] = useState('');
    const [descriptionErrorMsg, setDescriptionErrorMsg] = useState('');
    const [impactErrorMsg, setImpactErrorMsg] = useState('');

    const [createTicket, result] = useCreateTicketMutation();

    useEffect(() => {
        setTitleErrorMsg("");
    },[title, description, impact]);

    useEffect(() => {
        setDescriptionErrorMsg("");
    },[description, title, impact]);

    useEffect(() => {
        setImpactErrorMsg("");
    },[impact]);

    function renderImpactDropdown() {
        // ['Low', 'Medium', 'High']
        const options = [
            {value: 'Low'},
            {value: 'Medium'},
            {value: 'High'},
        ];

        return <Dropdown current={impact} options={options} handleSelectionState={setImpact}/>
    }

    async function handleSubmit(e){
        e.preventDefault();

        if(title.length > 60 || title.length < 3) {
            setTitleErrorMsg( error => 'Please submit a title with fewer than 60 characters and greater than 3 characters');
            return;
        }

        if(description.length >= 500){
            setDescriptionErrorMsg(error => 'Please submit a description with fewer than 500 characters');
            return;
        }

        if(impact.value !== 'Low' && impact.value !== 'Medium' && impact.value !== 'High'){
            setImpactErrorMsg(error => 'Only options for impact are "Low", "Medium, and "High"');
            return;
        }

        createTicket({
            title,
            description,
            impact: impact.value
        }).unwrap();



    }

    return (
        <div className={"section-new-ticket"}>
            <h1 className={"new-ticket--heading"}>Create New Ticket</h1>
            <form onSubmit={e => handleSubmit(e)} className="new-ticket-panel">

                <p className="label">New Title: </p>
                <input value={title} required onChange={e => setTitle(e.target.value)} type="text" className="label--value new-ticket--input"/>
                {titleErrorMsg ? <h6 className={"new-ticket--error"}>{titleErrorMsg}</h6> : null}
                <p className="label">New Description:</p>
                <textarea value={description} onChange={e => setDescription(e.target.value)} name="" cols="30" rows="10" className="label--value new-ticket--textarea"></textarea>
                {descriptionErrorMsg ? <h6 className={"new-ticket--error"}>{descriptionErrorMsg}</h6> : null}
                <p className="label">Impact:</p>
                <div className="label--value new-ticket--impact ">{renderImpactDropdown()}</div>
                {impactErrorMsg ? <h6 className={"new-ticket--error"}>{impactErrorMsg}</h6> : null}
                <button className="btn new-ticket--btn">Submit New Ticket</button>
            </form>
        </div>
    );
}

export default NewTicketPage;