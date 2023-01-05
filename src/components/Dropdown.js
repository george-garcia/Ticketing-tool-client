import {useState, useEffect, useRef} from "react";
import './Dropdown.css';

//options is an array of our expected options to display
//current is our current selected variable to display
//handleSelectionState is a function used to update our selection state variable in our parent component
function Dropdown ({ options, current, handleSelectionState }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handler = event => {
            if(!dropdownRef.current)
                return;

            if(!dropdownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        //add a listener to the body to watch for clicks anywhere
        //When the dropdown is open and we click outside of its element we can use this to close the dropdown
        document.addEventListener('click', handler, true);

        //cleanup function to remove the event listener when the dropdown is no longer on the screen
        return () => {
            document.removeEventListener('click', handler);
        };
    }, [])

    //when our dropdown is clicked this will handle that click and open/close our dropdown
    const openCloseDropdown = () => {
        setIsOpen(!isOpen);
    };

    //when one of the options are selected it will update the state in its parent component with the newly selected option
    const handleOptionClick = (option) => {
        handleSelectionState(option);
        setIsOpen(!isOpen);

    };


    //we map through our passed in options array to display them as selections in our component
    const renderedOptions = options.map(option => {
        return (
            <div className="dropdown-options" onClick={() => handleOptionClick(option)} key={option.id}>
                {option.name}
            </div>
        );
    });

    //if no current selection was passed in as current then we display 'select'... html
    let content = 'Select...';
    if(current?.name)
        content = current.name;

    return (
        <div ref={dropdownRef} className="component-dropdown">
            <div onClick={openCloseDropdown}>{content}</div>
            <div>{isOpen && renderedOptions}</div>
        </div>
    );

}

export default Dropdown;