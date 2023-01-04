import {useState} from "react";

function Dropdown ({ options, current }) {
    const [isOpen, setIsOpen] = useState(false);

    const openCloseDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
        console.log(option);
    };

    console.log(options);

    const renderedOptions = options.map(option => {
        return (
            <div onClick={() => handleOptionClick(option)} key={option.id}>
                {option.name}
            </div>
        );
    });

    return (
        <div>
            <div onClick={openCloseDropdown}>${current.name}</div>
            <div>{isOpen && renderedOptions}</div>
        </div>
    );

}

export default Dropdown;