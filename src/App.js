import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import TicTacToe from './tictactoe.js';
import ConnectFour from './connectfour.js';
import Home from './home.js';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/connectfour" element={<ConnectFour />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;