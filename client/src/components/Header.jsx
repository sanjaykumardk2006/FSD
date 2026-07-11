import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1><span className="freelancer-text">Freelancer</span> <span className="hub-text">Hub</span></h1>
        </div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/search">Jobs</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
      </div>
    </header>
  );
};
