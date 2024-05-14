import { Outlet, Link } from "react-router-dom";
import './Layout.css';

function Logout() {
    localStorage.removeItem('user');
}

const Layout = () => {
    return (
        <>
            <nav className="topNav">


                <Link className="a" to="/tasks">Tasks</Link>
                <Link to="login">Login</Link>
                <Link to="/" onClick={Logout}>Logout</Link>
                <div id='topnav-right'>

                    <Link to="/about">About</Link>
                    <Link to="/myTesting">What I did in testing</Link>
                </div>


            </nav>

            <Outlet />
        </>
    )
};

export default Layout;