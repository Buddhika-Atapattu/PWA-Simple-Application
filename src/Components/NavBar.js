import { React, useState } from "react";
import Home from "./Home";
import About from "./About";
import User from "./User";
import IsOnlineComponent from "./onlineOrNot";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";

export default function NavBar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "User", path: "/user" },
  ];
  let IsOnline = navigator.onLine;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Router>
      <IsOnlineComponent status={IsOnline} />
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <div className="navbar-brand text-light fw-bold">
            <Link to={"/"}>PWA-App</Link>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={(event) => {
              console.log(event);
              setMenuOpen(!menuOpen);
              // const menu = document.getElementById("navbarNav");
              const button = document.querySelector("button"); // or any specific selector
              const expanded = button.getAttribute("aria-expanded");
              // Toggle the aria-expanded attribute
              button.setAttribute(
                "aria-expanded",
                expanded === "true" ? "false" : "true"
              );
              document.querySelector("#navbarNav").classList.toggle("show");
              console.log(expanded);
            }}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav">
            <ul className="navbar-nav">
              {menuItems.map((item, index) => {
                return (
                  <li key={index} className="nav-item text-end mb-3">
                    <Link
                      to={item.path}
                      className="text-light fw-bold text-end">
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route path="/" Component={Home}></Route>
        <Route path="/about" Component={About}></Route>
        <Route path="/user" Component={User}></Route>
      </Switch>
    </Router>
  );
}
