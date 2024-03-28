import { Navbar, Nav } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar
        bg="dark"
        variant="dark"
        className="px-4"
        expand="lg"
        collapseOnSelect
      >
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="40px" />
            ShoppingCart
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart />
                Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>
                <FaUser />
                SignIn
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};
export default Header;
