import './NavPage.css';
import {Link} from "react-router-dom";
const NavPage = ({children}) => {
    return (
        <div className="section-nav">
            <div className="nav-top">top</div>
            <div className="nav-left">
                <ul className="nav-left--firstList list-styles">
                    <li className="nav--item"><Link to={'/all-tickets'}>All Tickets</Link></li>
                    <li className="nav--item">New Ticket</li>
                </ul>
                <ul className="nav-left--secondList list-styles">
                    <li className="nav--item"><Link to={'/dashboard'}>My Dashboard</Link></li>
                    <li className="nav--item">My Open Tickets</li>
                    <li className="nav--item">Unassigned Tickets</li>
                </ul>
                <ul className="nav-left--thirdList list-styles">
                    <li className="nav--item"><Link to={'/open-tickets'}>Open</Link></li>
                    <li className="nav--item">Assigned</li>
                    <li className="nav--item">In Progress</li>
                    <li className="nav--item">Pending</li>
                </ul>
            </div>
            <div className="nav-body">{children}</div>
        </div>
    );
}

export default NavPage;