import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  // Active Link
  const [active, setActive] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    setActive(currentPath || "index");
  }, [location]);

  function activeLink(e) {
    const newActive = e.target.getAttribute("href");
    setActive(newActive);
  }

  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top px-4 px-lg-5 py-lg-0">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <h1 className="m-0">
            <i className="fa fa-building text-primary me-3" />
            APEX
          </h1>
        </Link>
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-3 py-lg-0">
            <Link
              to="/"
              className={`nav-item nav-link ${
                active === "index" ? "active" : ""
              }`}
              onClick={activeLink}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`nav-item nav-link ${
                active === "about" ? "active" : ""
              }`}
              onClick={activeLink}
            >
              About Us
            </Link>
            <Link
              to="/service"
              className={`nav-item nav-link ${
                active === "service" ? "active" : ""
              }`}
              onClick={activeLink}
            >
              Our Services
            </Link>
            <Link
              to="/feature"
              className={`nav-item nav-link ${
                active === "feature" ? "active" : ""
              }`}
              onClick={activeLink}
            >
              Features
            </Link>
            <Link
              to="/contact"
              className={`nav-item nav-link ${
                active === "contact" ? "active" : ""
              }`}
              onClick={activeLink}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}
