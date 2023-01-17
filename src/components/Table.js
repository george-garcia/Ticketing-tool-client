import {useNavigate} from "react-router-dom";
import './Table.css';
import {useState, useEffect} from "react";


function Table({data, config, keyFn, results}) {
    const toTicketPage = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);

    if(!results)
        results = 15;

    useEffect(() => {
        setTotalPages(Math.ceil(data.length / results));
    })

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

    function handleSetPageOnClick(pageNumber){
        setPage(pageNumber);
    }

    function renderNumberOfPageButtons() {
        // for every x results return a page
        const pageButtons = [];

        for (let page = 0; page < totalPages; page++) {
            pageButtons.push(<button onClick={e => handleSetPageOnClick(page)}>{page + 1}</button>)
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
                <p>Showing Results: {renderedData().length} / {data.length}</p>
                <p>Total Pages: {totalPages}</p>
                <p>{renderNumberOfPageButtons()}</p>
            </div>
        </>
    );
}

export default Table;