import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">
          Devs-Companion
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Login
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="#">
                Calender
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="#">
                Todos
              </Link>
            </li>
          </ul>
          <span class="navbar-text">Small Text</span>
        </div>
      </div>
    </nav>
  );
};
