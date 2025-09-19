import React from "react";
import { useNavigate } from "react-router-dom";
// import Modal from "../modal/FolderModal";

const NavigationBar = ({ userId, onAddFolder }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  aria-current="page"
                  onClick={() => navigate(`/dashboard/${userId}`)}
                  // href={`/dashboard/${userId}`}
                >
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={onAddFolder}
                  // data-bs-toggle="modal"
                  // data-bs-target="#addfolder"
                  // onClick={handleModalClick}
                >
                  Add New Expense Folder
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Sign Out
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* <Modal btnId={"addfolder"} userId={userId} mode={"create"} />; */}
    </>
  );
};

export default NavigationBar;
