import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

function Home() {
    return (
        <div className="home">
            <h1 className="title">Welcome to the Shamrock hub</h1>
            <p className="title-paragraph">This is my lovely react site that I have thrown together. It's rough, it's unpolished but it will get there with time.
            <p className='title-paragraph'>While you are here, enjoy the <a href='http://localhost:3000/tictactoe'>TicTacToe</a> and the <a href='http://localhost:3000/connectfour'>ConnectFour</a> games</p>
            </p>
        </div>
    );
}

export default Home;
