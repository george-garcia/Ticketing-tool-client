import {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import './Table.css';

function Table({data, config, keyFn}) {
    const toTicketPage = useNavigate();

    const handleClick = (id) => {
        toTicketPage(`/tickets/${id}`);
    }

    const renderedRows = data.map((rowData) => {
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

    return (
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
    );
}

export default Table;