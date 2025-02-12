import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import TicTacToe from './features/tic-tac-toe/tictactoe.js';
import ConnectFour from './features/connectfour/connectfour.js';
import Home from './home.js';
import GfGWeatherApp from './features/weather/Weather.js';
import PhysicsSimulation from './features/ball-simulation/PhysicsSimulation.js';
import WebSocketComponent from './features/car-remote/CarRemote.js';
import VideoPlayer from './components/videoPlayer.js';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/connectfour" element={<ConnectFour />} />
        <Route path="/weather" element={<GfGWeatherApp />} />
        <Route path="/simulation" element={<PhysicsSimulation />} />
        <Route path="/carremote" element={<WebSocketComponent />} />
        <Route path="/videoplayer" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

