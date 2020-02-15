import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { ContextState } from "../context";
import { Collapse, NavbarBrand, Navbar, NavItem, Nav } from "reactstrap";
import classnames from "classnames";
import Logo from "../assets/img/GC-logo.png";

const Menu = () => {
  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const { authState, handleUserLogout } = useContext(ContextState);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    setNavbarCollapse(false);

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });

  const logoutAction = () => {
    handleUserLogout();
    return <Redirect to="/" />;
  };

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <div className="navbar-translate">
        <NavbarBrand data-placement="bottom" href="/" title="Energy360">
          <img className="d-block logo" src={Logo} alt="logo" />
        </NavbarBrand>
        <button
          aria-expanded={navbarCollapse}
          className={classnames("navbar-toggler navbar-toggler", {
            toggled: navbarCollapse
          })}
          onClick={toggleNavbarCollapse}
        >
          <span className="navbar-toggler-bar bar1" />
          <span className="navbar-toggler-bar bar2" />
          <span className="navbar-toggler-bar bar3" />
        </button>
      </div>
      <Collapse className="justify-content-end" navbar isOpen={navbarCollapse}>
        <Nav navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/scope" className="nav-link">
              Scopes
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/policy" className="nav-link">
              Policy
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/terms-of-service" className="nav-link">
              Terms Of Service
            </Link>
          </NavItem>
          {!authState ? (
            <NavItem>
              <Link to="/" className="nav-link">
                Login/Register
              </Link>
            </NavItem>
          ) : (
            <NavItem>
              <Link to="#" className="nav-link" onClick={logoutAction}>
                Logout
              </Link>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Menu;
