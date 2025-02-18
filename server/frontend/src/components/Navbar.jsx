import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currUser = sessionStorage.getItem("username");
    setUsername(currUser);
  }, []);

  const logout = async () => {
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, { method: "GET" });

    const json = await res.json();
    if (json) {
      sessionStorage.removeItem("username");
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "darkturquoise", height: "1in" }}>
      <div className="container-fluid">
        <h2 style={{ paddingRight: "5%" }}>Dealerships</h2>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">
                Contact Us
              </Link>
            </li>
          </ul>
          <span className="navbar-text">
            {username ? (
              <>
                <span className="homepage_links">{username}</span>
                <button className="btn btn-link homepage_links" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="homepage_links" to="/login">
                  Login
                </Link>
                <Link className="homepage_links" to="/register">
                  Register
                </Link>
              </>
            )}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
