import { UserRound, LogOut } from 'lucide-react';
import { LogoutHandle } from '../helper/SubmitHendle';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';

const StdNavbar = () => {

    const navigate = useNavigate();

    return (

        <Navbar expand="md" sticky="top" bg="light" variant="light" className="bg-opacity-100" collapseOnSelect>
            <Container fluid>
                <Navbar.Brand href="#" className="fw-semibold ">University Management</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className="justify-content-end">
                    <Nav className="nav-underline1 gap-3">
                        <Nav.Link as={NavLink} to="/" className="fw-semibold  ">
                            Home
                        </Nav.Link>

                        <Nav.Link as={NavLink} to="/university" className="fw-semibold ">
                            University
                        </Nav.Link>

                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="profile-tooltip"><b>Profile</b></Tooltip>}
                        >
                            <Nav.Link as={NavLink} to="/dashboard">
                                <UserRound className='' style={{ marginTop: '-5px' }} />
                            </Nav.Link>
                        </OverlayTrigger>

                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip id="logout-tooltip"><b>Logout</b></Tooltip>}
                        >
                            <Nav.Link onClick={() => LogoutHandle(navigate)}>
                                <LogOut className='' style={{ marginTop: '-5px' }} />
                            </Nav.Link>
                        </OverlayTrigger>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default StdNavbar;