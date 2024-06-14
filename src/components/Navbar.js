import React from "react";
import { useNavigate } from "react-router-dom";
// import { Router, useLocation } from "react-router-dom";

const Navbar = (props) => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          iNotebook
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/home">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
          </ul>
          {!(localStorage.getItem('token'))?<form className="d-flex">
            <a className="btn btn-primary mx-1" href="/login" role="button">
              Login
            </a>
            <a className="btn btn-primary mx-1" href="/signup" role="button">
              Signup
            </a>
          </form>: 
          <button className="btn btn-primary mx-1" onClick={handleLogout}>
            Logout
          </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
