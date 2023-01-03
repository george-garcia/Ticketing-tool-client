import {Fragment} from "react";
import {useNavigate} from "react-router-dom";

function Table({data, config, keyFn}) {
    const toTicketPage = useNavigate();

    const handleClick = (id) => {
        console.log(id);
        toTicketPage(`/tickets/${id}`);
    }

    const renderedRows = data.map((rowData) => {
            return (
                <tr onClick={(e) => handleClick(rowData._id)} key={rowData._id} className="dash-row--data">
                    <td className="p-3">{rowData._id}</td>
                    <td className="p-3">{rowData.title}</td>
                    <td className="p-3">{rowData.description}</td>
                    <td className="p-3">{rowData.priority}</td>
                    <td className="p-3">{rowData.status}</td>
                </tr>
            );
        }
    )

    const renderedHeaders = config.map((column) => {
        return <th className="mar-2" key={column.label}>{column.label}</th>
    });

    return (
        <table className="dash-table">
            <thead className="dash-head">
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