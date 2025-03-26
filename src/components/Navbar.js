import React, { useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';

function Navbar() {
    const menu = useRef(null);

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => { window.location.href = "/" } },
        { label: 'Tictactoe', icon: 'pi pi-th-large', command: () => { window.location.href = "/tictactoe" } },
        { label: 'ConnectFour', icon: 'pi pi-th-large', command: () => { window.location.href = "/connectfour" } },
        { label: 'Weather', icon: 'pi pi-cloud', command: () => { window.location.href = "/weather" } },
        { label: 'Simulation', icon: 'pi pi-cog', command: () => { window.location.href = "/simulation" } },
        { label: 'CarRemote', icon: 'pi pi-car', command: () => { window.location.href = "/carremote" } },
        { label: 'Videoplayer', icon: 'pi pi-video', command: () => { window.location.href = "/videoplayer" } },
        { label: 'Budget', icon: 'pi pi-money-bill', command: () => { window.location.href = "/budget" } }
    ];

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to="/" className="logo">Shamrock Hub</Link>
                <img src={require('../assets/clover.png')} width={25} height={25} alt="Clover Logo" />
            </div>
            <div className="navbar-center">
                <Menu model={items} popup ref={menu} id="popup_menu" />
                <Button label="Menu" icon="pi pi-bars" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        </nav>
    );
}

export default Navbar;