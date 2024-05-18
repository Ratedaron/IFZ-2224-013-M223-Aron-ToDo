import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import './Layout.css';

const Layout = () => {
    const [status, setStatus] = useState(localStorage.getItem('status'));
    const location = useLocation();

    useEffect(() => {
        // Set status to 'notLoggedIn' if the current path is '/'
        if (location.pathname === "/") {
            localStorage.setItem('status', 'notLoggedIn');
            setStatus('notLoggedIn');
        }

        const interval = setInterval(() => {
            const newStatus = localStorage.getItem('status');
            setStatus(newStatus);
        }, 1000);

        return () => clearInterval(interval);
    }, [location.pathname]);

    const Logout = () => {
        localStorage.removeItem('user');
        localStorage.setItem('status', 'notLoggedIn');
        setStatus('notLoggedIn'); // Update the status state
    }

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
                    {/* Render About and MyTesting links only if the user is logged in */}
                    {status !== 'notLoggedIn' && (
                        <>
                            <Link to="/about">About</Link>
                            <Link to="/myTesting">What I did in testing</Link>
                        </>
                    )}
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
