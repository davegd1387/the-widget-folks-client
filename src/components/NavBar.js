import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";

const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      testDecoration: isActive ? "none" : "underline",
    };
  };
  // const auth = useAuth();
  const { user } = useAuth();
  // console.log(`user: ${JSON.stringify(isadmin)}`);
  return (
    <nav className="nav">
      <img src="../favicon-32x32.png" alt="f312" />
      <h1 className="nav__h1 nowrap">The Widget Folks</h1>
      <img src="../favicon-32x32.png" alt="f312" />
      <div className="nav__links">
        <NavLink style={navLinkStyles} to="/">
          Home
        </NavLink>
        {/* <NavLink style={navLinkStyles} to="/about">
        About
      </NavLink> */}
        <NavLink style={navLinkStyles} to="/products">
          Products
        </NavLink>
        {user && (
          // {auth.user && (
          <>
            <NavLink style={navLinkStyles} to="/profile">
              Profile
            </NavLink>
            {user?.isadmin && (
              <>
                <NavLink style={navLinkStyles} to="/admin">
                  Admin
                </NavLink>
              </>
            )}
            <NavLink style={navLinkStyles} to="/sales">
              Sales
            </NavLink>
          </>
        )}
        {!user && (
          // {!auth.user && (
          <>
            <NavLink style={navLinkStyles} to="/login">
              Login
            </NavLink>
            <NavLink style={navLinkStyles} to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
