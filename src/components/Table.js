import {useNavigate} from "react-router-dom";
import './Table.css';
import {useState, useEffect, useRef} from "react";


function Table({data, config, keyFn, results}) {
    const toTicketPage = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    let buttonRef = useRef();


    if (!results)
        results = 15;

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / results));
    });

    // useEffect(() => {
    //
    //     if(!document.querySelector('.btn--active') && document.getElementById('0')) {
    //         buttonRef = document.getElementById('0');
    //         buttonRef.classList.add('.btn--active');
    //         console.log(buttonRef);
    //
    //     }
    // });

    function renderedData() {
        // if (data.length > results) {
        //     return data.slice(0, results);
        // } else {
        //     return data;
        // }

        return data.slice(page * results, (results * (page + 1)));
        // page 2 slice 15, 30
        // page 3 slice 30, 45
    }

    const handleClick = (id) => {
        toTicketPage(`/tickets/${id}`);
    }

    function handleSetPageOnClick(pageNumber, event) {
        setPage(pageNumber);

        buttonRef = document.querySelector('.btn--active');
        if (buttonRef)
            buttonRef.classList.remove('btn--active');

        event.target.classList.toggle('btn--active');
    }

    function nextButton(){
        if((page + 1) < totalPages) {
            setPage(page => page + 1);

            buttonRef = document.querySelector('.btn--active');
            if (buttonRef)
                buttonRef.classList.remove('btn--active');

            buttonRef = document.getElementById(`${page + 1}`);
            buttonRef.classList.add('btn--active');
        }
    }
    function previousButton(){
        if((page + 1) > 1) {
            setPage(page => page - 1);

            buttonRef = document.querySelector('.btn--active');
            if (buttonRef)
                buttonRef.classList.remove('btn--active');

            buttonRef = document.getElementById(`${page - 1}`);
            buttonRef.classList.add('btn--active');
            // console.log(buttonRef);


        }
    }

    function renderNumberOfPageButtons() {
        // for every x results return a page
        const pageButtons = [];

        for (let page = 1; page < totalPages; page++) {
            pageButtons.push(<button key={page} id={`${page}`} className={"btn--outline"} onClick={e => handleSetPageOnClick(page, e)}>{page + 1}</button>)
        }
        return pageButtons;
    }

    const renderedRows = renderedData().map((rowData) => {
            return (
                <tr onClick={(e) => handleClick(rowData._id)} key={rowData._id} className="dash-row--data">
                    <td className="row-data">{rowData._id}</td>
                    <td className="row-data row-title">{rowData.title}</td>
                    <td className="row-data">{rowData.description}</td>
                    <td className="row-data">{rowData.priority}</td>
                    <td className="row-data">{rowData.status}</td>
                </tr>
            );
        }
    )

    const renderedHeaders = config.map((column) => {
        return <th className="table-headers" key={column.label}>{column.label}</th>
    });

    return (<>
            <table className="table">
                <thead>
                <tr className="">
                    {renderedHeaders}
                </tr>
                </thead>
                <tbody>
                {renderedRows}
                </tbody>
            </table>
            <div className={'table-footer'}>
                <p>Showing {data.length < 1 ? 0 : 1 + (results * page)} to {renderedData().length + (results * page)} of {data.length} entries.</p>
                <div className="table-footer--right">
                    <button onClick={previousButton} className={"btn--outline"}>Previous</button>
                    <div className={"table-footer--buttons"}>
                        <button id={0} className={"btn--outline btn--active"} onClick={e => handleSetPageOnClick(0, e)}>{1}</button>
                        {renderNumberOfPageButtons()}
                    </div>
                    <button onClick={nextButton} className={"btn--outline"}>Next</button>
                </div>
            </div>
        </>
    );
}

export default Table;