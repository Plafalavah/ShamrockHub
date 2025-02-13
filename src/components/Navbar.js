import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

function Navbar() {
    return (
      <nav className='navbar'>
      <div className='navbar-left'>
        <Link to="/" className="logo">Shamrock Hub</Link>
        <img src={require('../assets/clover.png')} width={25} height={25} alt="Clover Logo" />
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <Link to="/"> <Button className="nav-button" label="Home" severity="success" icon="pi pi-home" outlined/> </Link>
          <Link to="/tictactoe"> <Button className="nav-button" label="Tictactoe" severity="success" icon="pi" outlined/> </Link>
          <Link to="/connectfour"> <Button className="nav-button" label="ConnectFour" severity="success" icon="pi" outlined/> </Link>
          <Link to="/weather"> <Button className="nav-button" label="Weather" severity="success" icon="pi" outlined/> </Link>
          <Link to="/simulation"> <Button className="nav-button" label="Simulation" severity="success" icon="pi" outlined/> </Link>
          <Link to="/carremote"> <Button className="nav-button" label="CarRemote" severity="success" icon="pi" outlined/> </Link>
          <Link to="/videoplayer"> <Button className="nav-button" label="Videoplayer" severity="success" icon="pi pi-video" outlined/> </Link>
          <Button icon="pi pi-user" className="nav-button" rounded outlined severity="success" aria-label="User" />
        </ul>
      </div>
      </nav>
    );
  }

export default Navbar