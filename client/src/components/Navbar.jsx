import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffcanvasExample() {
  return (
    <>
      {['xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary bg-dark mb-3">
          <Container fluid>
            <Navbar.Brand classname="">Galactic Gaming</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/search">Search Games</Nav.Link>
                  {Auth.loggedIn() ? (
                    <>
                        <Nav.Link as={Link} to='/saved'>
                            Saved Games
                        </Nav.Link>
                        {/*<Nav.Link as={Link} to='/findPeople'>Find People</Nav.Link>*/}
                        <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                    </>
                  ) : (
                    <div>
                        <Nav.Link as={Link} to="/LogIn">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signUp">Sign-up</Nav.Link>
                    </div>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;