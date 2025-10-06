import { UserRound, LogOut } from 'lucide-react';
import { LogoutHandle } from '../helper/SubmitHendle';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, OverlayTrigger, Tooltip, Image } from 'react-bootstrap';
import { GetRole } from '../helper/getAuth';
import "./navbar.css"
const StdNavbar = () => {
    const navigate = useNavigate();
    const isStudent: boolean = (GetRole() === 'student')
    const isAdmin: boolean = (GetRole() === 'admin')

    return (

        <Navbar className='blur-navbar rounded-5 mt-3 mx-3' data-aos="fade-down" data-aos-once="true" expand="md" sticky="top" bg="light" variant="light" collapseOnSelect >
            <Container fluid>
                <Navbar.Brand href="#" className="fw-semibold text-light bg-dark px-2 py-1 rounded-5">
                    <Image alt="Logo" src="/edu.png" width="30" height="30" className="d-inline-block align-top" roundedCircle />
                    {' '}EDU MATRIX</Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar" className="justify-content-end">
                    <Nav className="nav-underline1 pe-2 gap-3">
                        <Nav.Link as={NavLink} to="/" className="fw-semibold  ">
                            Home
                        </Nav.Link>

                        {isStudent ?
                            <>
                                <Nav.Link as={NavLink} to="/university" className="fw-semibold ">
                                    University
                                </Nav.Link>

                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="profile-tooltip"><b>Profile</b></Tooltip>}
                                >
                                    <Nav.Link as={NavLink} to="/dashboard" aria-label="Profile">
                                        <UserRound style={{ marginTop: '-5px' }} />
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
                            </>
                            :
                            isAdmin ?
                                <Nav.Link as={NavLink} to="/admin/university" className="fw-semibold ">
                                    University
                                </Nav.Link>
                                :
                                <>
                                    <Nav.Link as={NavLink} to="/register" className="fw-semibold ">
                                        Register
                                    </Nav.Link>
                                    <Nav.Link as={NavLink} to="/login" className="fw-semibold ">
                                        Login
                                    </Nav.Link>
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default StdNavbar;