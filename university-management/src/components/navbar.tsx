import { UserRound, LogOut } from 'lucide-react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';
import { Tooltip } from 'bootstrap';
import { LogoutHandle } from '../helper/SubmitHendle';
import { Link } from 'react-router-dom';

const Navbar = () => {
    useEffect(() => {
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((el) => {
            new Tooltip(el);
        });
    }, []);

    return (
        <nav className="navbar nav-underline navbar-expand-md sticky-top navbar-light bg-light bg-opacity-100   ">
            <div className="container-fluid">
                <a className="navbar-brand fw-semibold" href="#">University Management</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold " to="/">Home</Link>
                        </li>


                        {(localStorage.getItem("token")) && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link fw-semibold" to="/university">University</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"
                                        title="<b>Profile</b>"><UserRound style={{ marginTop: '-5px' }} /> </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-html="true"
                                        title="<b>Logout</b>"
                                        onClick={LogoutHandle}><LogOut style={{ marginTop: '-5px' }} /> </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav >
    )

}

export default Navbar