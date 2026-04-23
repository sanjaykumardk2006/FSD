import React from 'react';
import '../App.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1><span className="freelancer-text">Freelancer</span> <span className="hub-text">Hub</span></h1>
        </div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </nav>
      </div>
    </header>
  );
};
