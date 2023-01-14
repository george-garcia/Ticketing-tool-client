import './NavPage.css';
import {Link} from "react-router-dom";
import {useRef} from "react";
import { HiClipboardDocumentCheck, HiTicket, HiClock, HiHome, HiPresentationChartLine, HiPencilSquare } from "react-icons/hi2";
import { GiHourglass } from "react-icons/gi";
const NavPage = ({children}) => {
    let currentRef = useRef();

    // console.log(currentRef);

    function handleClick(e){
        currentRef = document.querySelector('.link--active');
        if(currentRef)
            currentRef.classList.remove('link--active');

        e.target.classList.toggle('link--active');
    }



    return (
        <div className="section-nav">
            <div className="nav-top">top</div>
            <div className="nav-left">

                <div className="nav-left--list mb-6">
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/all-tickets'}>{<HiTicket/>}All Tickets</Link>
                    <Link onClick={event => handleClick(event)} className={"link--item"} to="/new-ticket">{<HiPencilSquare/>}New Ticket</Link>
                </div>
                <hr className={"mb-6"}/>
                <div className="nav-left--list mb-6">
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/dashboard'}>{<HiHome/>} My Dashboard</Link>
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/my-open-tickets'}>{<HiTicket/>}My Open Tickets</Link>
                </div>
                <hr className={"mb-6"}/>
                <div className="nav-left--list">
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/open-tickets'}>{<HiTicket/>} Open</Link>
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/assigned-tickets'}>{<HiClipboardDocumentCheck/>}Assigned</Link>
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/in-progress-tickets'}>{<HiPresentationChartLine/>} In Progress</Link>
                    <Link onClick={event => handleClick(event)} className={"link--item"} to={'/pending-tickets'}>{<HiClock/>}Pending</Link>
                </div>
            </div>
            <div className="nav-body">{children}</div>
        </div>
    );
}

export default NavPage;