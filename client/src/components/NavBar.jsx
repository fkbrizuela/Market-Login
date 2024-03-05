import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

function NavScroll() {
  const redirect = useNavigate()

  const cerrarSesion = () => {
    Cookies.remove('usuario')
    redirect('/')
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary vw-100 mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">ASTROMarket</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/Productos">Productos</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-light">Buscar</Button>
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <Link to="/Cart">
            <Button variant="outline-light">
              <i className="bi bi-box"></i> Box
            </Button>
          </Link>
          <Button variant="outline-danger" onClick={cerrarSesion}>Cerrar sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
