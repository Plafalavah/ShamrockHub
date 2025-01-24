import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
      <nav className='navbar'>
        <div className='navbar-left'>
            <Link to="/" className="logo">Shamrock Hub</Link>
            <img src={`${process.env.PUBLIC_URL}/clover.png`} width={25} height={25} alt="Clover Logo" />
        </div>
        <div className="navbar-center">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/tictactoe">Tictactoe</Link></li>
                <li><Link to="/connectfour">ConnectFour</Link></li>
                <li><Link to="/weather">Weather</Link></li>
                <li><Link to="/simulation">Simulation</Link></li>
                <li><Link to="/carremote">CarRemote</Link></li>
            </ul>
        </div>
      </nav>
    );
  }

export default Navbar