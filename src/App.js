import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import TicTacToe from './tictactoe.js';
import ConnectFour from './connectfour.js';
import Home from './home.js';
import GfGWeatherApp from './Weather.js';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/connectfour" element={<ConnectFour />} />
        <Route path="/weather" element={<GfGWeatherApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;