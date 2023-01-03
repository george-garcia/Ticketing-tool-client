import './NavPage.css';
const NavPage = ({children}) => {
    return (
        <div className="section-nav">
            <div className="nav-top">top</div>
            <div className="nav-left">left</div>
            <div className="nav-body">{children}</div>
        </div>
    );
}

export default NavPage;