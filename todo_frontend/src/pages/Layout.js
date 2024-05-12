import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
    return (
        <>
            <nav className="topNav">


                <Link className="a" to="/tasks">Tasks</Link>
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