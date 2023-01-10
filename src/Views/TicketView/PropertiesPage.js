import './PropertiesPage.css';
import {useFetchUsersQuery, useFetchOneTicketQuery, useUpdateTicketMutation} from "../../store";
import {useEffect, useState} from "react";
import Dropdown from "../../components/Dropdown";

function PropertiesPage({ticketId}) {
    //load our ticket and users
    const {data: ticketData, isLoading: ticketIsLoading} = useFetchOneTicketQuery(ticketId);
    const {data: usersData, isLoading: usersIsLoading} = useFetchUsersQuery();
    const [updateTicket, ticketResults] = useUpdateTicketMutation();

    //set our ticket and customer objects into state
    const [ticket, setTicket] = useState({});
    const [customer, setCustomer] = useState({});

    //set our ticket properties into state
    const [statusDropdown, setStatusDropdown] = useState('');
    const [priorityDropdown, setPriorityDropdown] = useState('');
    const [impactDropdown, setImpactDropdown] = useState('');
    const [categoryDropdown, setCategoryDropdown] = useState('');
    const [productDropdown, setProductDropdown] = useState('');
    const [assignedDropdown, setAssignedDropdown] = useState('');

    //input
    const [contactDropdown, setContactDropdown] = useState('');

    // const {customerData} = useFetchOneUserQuery(data.ticket.createdBy);


    useEffect(() => {
        // load ticket data

        if (!ticketIsLoading) {
            //set our ticket state object
            setTicket(ticketData.ticket);
        }

        if (!usersIsLoading) {
            for (const user of usersData.users) {
                if (user._id === ticket.createdBy)
                    setCustomer(user);

            }
        }
    });


    useEffect(() => {

        if (ticket?.assigned && !usersIsLoading) {

            for (const user of usersData.users) {
                if (ticket.assigned === user._id) {
                    const assignedObject = {
                        id: user._id
                    }
                    let firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
                    let lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1);
                    const fullName = `${firstName} ${lastName}`;

                    assignedObject.value = fullName;

                    setAssignedDropdown(assignedObject);
                }
            }
        }
    }, [ticket, customer])

    useEffect(() => {

        setStatusDropdown({value: ticket.status});
        setPriorityDropdown({value: ticket.priority});
        setImpactDropdown({value: ticket.impact});
        setCategoryDropdown({value: ticket.category});
        setProductDropdown({value: ticket.product});

    }, [ticket]);

    function renderStatusDropdown() {
        // const options = ['Open', 'Assigned', 'Pending', 'Closed', 'In progress', 'Resolved'];
        const options = [
            {value: 'Open'},
            {value: 'Assigned'},
            {value: 'Pending'},
            {value: 'Closed'},
            {value: 'In progress'},
            {value: 'Resolved'},
        ];

        return <Dropdown current={statusDropdown} options={options} handleSelectionState={setStatusDropdown}/>
    }

    function renderPriorityDropdown() {
        // ['Minor', 'Major', 'Critical']
        const options = [
            {value: 'Minor'},
            {value: 'Major'},
            {value: 'Critical'},
        ];

        return <Dropdown current={priorityDropdown} options={options} handleSelectionState={setPriorityDropdown}/>
    }

    function renderImpactDropdown() {
        // ['Low', 'Medium', 'High']
        const options = [
            {value: 'Low'},
            {value: 'Medium'},
            {value: 'High'},
        ];

        return <Dropdown current={impactDropdown} options={options} handleSelectionState={setImpactDropdown}/>
    }

    function renderCategoryDropdown() {
        // ['Incident', 'Problem', 'Major Incident']
        const options = [
            {value: 'Incident'},
            {value: 'Problem'},
            {value: 'Major Incident'},
        ];

        return <Dropdown current={categoryDropdown} options={options} handleSelectionState={setCategoryDropdown}/>
    }

    function renderProductDropdown() {
        // ['Incident', 'Problem', 'Major Incident']
        const options = [
            {value: 'Entertainment'},
            {value: 'Insurance'},
            {value: 'Banking'},
        ];

        return <Dropdown current={productDropdown} options={options} handleSelectionState={setProductDropdown}/>
    }

    function renderCustomerName() {

        if (!customer?.firstName)
            return;

        let firstName = customer.firstName[0].toUpperCase() + customer.firstName.slice(1);
        let lastName = customer.lastName[0].toUpperCase() + customer.lastName.slice(1);
        const fullName = `${firstName} ${lastName}`;
        return fullName;
    }

    function renderAssigned() {

        if (!usersData?.users)
            return;

        const usersArr = usersData.users.map(user => {
            const firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1);
            const lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1);
            const fullName = `${firstName} ${lastName}`;

                return {
                    value: fullName,
                    id: user._id,
                }
            });

        const noneAssigned = {
            value: 'None',
            id: null
        };

        usersArr.push(noneAssigned);

        return <Dropdown options={usersArr} current={assignedDropdown} handleSelectionState={setAssignedDropdown} />
    }

    function saveChanges(){

        if(!usersData?.users || !ticketData.ticket)
            return;

        const queryObject = {};

        //status dropdown
        if(statusDropdown.value !== ticket.status)
            queryObject.status = statusDropdown.value

        //priority
        if(priorityDropdown.value !== ticket.priority)
            queryObject.priority = priorityDropdown.value

        //impact
        if(impactDropdown.value !== ticket.impact)
            queryObject.impact = impactDropdown.value

        //category
        if(categoryDropdown.value !== ticket.category)
            queryObject.category = categoryDropdown.value

        //product
        if(productDropdown.value !== ticket.product)
            queryObject.product = productDropdown.value

        //contact
        if(contactDropdown)
            queryObject.contact = contactDropdown;

        //assigned
        //check if the ticket is attempting to assign
        if(assignedDropdown?.value){
            //check if the attempt to assign is different from what the ticket has assigned to it
            if(assignedDropdown.id !== ticket.assigned){
                //if different then put the new assigned on the query object
                queryObject.assigned = assignedDropdown.id;
            }
        }

        // if no changes where made we should not make a request with an empty object and instead return
        if(Object.keys(queryObject).length === 0)
            return;

        //put the ticketId on the query object
        queryObject.ticketId = ticketId;
        //
        // //dispatch our query object with the updateTicket mutation
        updateTicket(queryObject).unwrap();

        //assigned



    }


    return (
        <div className="ticket-properties">
            <h3 className="ticket-properties--header">PROPERTIES</h3>
            <p className="ticket-properties--label"> Customer</p>
            <p className="ticket-properties--value">{renderCustomerName()}</p>
            <p className="ticket-properties--label"> Assigned</p>
            <div className="ticket-properties--value">{renderAssigned()}</div>
            <p className="ticket-properties--label"> Status</p>
            <div className="ticket-properties--value">{renderStatusDropdown()}</div>
            <p className="ticket-properties--label"> Priority</p>
            <div className="ticket-properties--value">{renderPriorityDropdown()}</div>
            <p className="ticket-properties--label"> Impact</p>
            <div className="ticket-properties--value"> {renderImpactDropdown()}</div>
            <p className="ticket-properties--label"> Contact</p>
            <input className="ticket-properties--value ticket-properties--input"
                   onChange={(e) => setContactDropdown(e.target.value)} value={contactDropdown}
                   placeholder={ticket.contact}></input>
            <p className="ticket-properties--label"> Email</p>
            <p className="ticket-properties--value">{customer.email}</p>
            <p className="ticket-properties--label"> Category</p>
            <div className="ticket-properties--value">{renderCategoryDropdown()}</div>
            <p className="ticket-properties--label"> Product</p>
            <div className="ticket-properties--value">{renderProductDropdown()}</div>

            <div className="ticket-properties--footer">
                <button onClick={saveChanges} className="btn ticket-properties--btn">Save Changes</button>
            </div>

        </div>
    );
}

export default PropertiesPage;