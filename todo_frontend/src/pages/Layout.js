import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import './Layout.css';

function Logout() {
    localStorage.removeItem('user');
    localStorage.setItem('status', 'notLoggedIn');
}

const Layout = () => {
    const [status, setStatus] = useState(localStorage.getItem('status'));

    useEffect(() => {
        const interval = setInterval(() => {
            const newStatus = localStorage.getItem('status');
            setStatus(newStatus);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <nav className="topNav">
                {/* Render Tasks button only if the user is logged in */}
                {status !== 'notLoggedIn' && (
                    <Link className="a" to="/tasks">Tasks</Link>
                )}

                {/* Render login button only if the user is not logged in */}
                {status === 'notLoggedIn' && (
                    <Link to="login">Login</Link>
                )}

                <Link to="/" onClick={Logout}>Logout</Link>
                <div id='topnav-right'>
                    <Link to="/about">About</Link>
                    <Link to="/myTesting">What I did in testing</Link>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
