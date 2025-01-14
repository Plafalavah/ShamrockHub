import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import TicTacToe from './tictactoe.js';
import ConnectFour from './connectfour.js';
import Home from './home.js';
import GfGWeatherApp from './Weather.js';
import Sim from './Simulation.js';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/connectfour" element={<ConnectFour />} />
        <Route path="/weather" element={<GfGWeatherApp />} />
        <Route path="/simulation" element={<Sim />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;