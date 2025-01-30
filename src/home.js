import React from 'react';
import './index.css'

function Home() {
    return (
        <div className="home">
            <h1 className="title">Welcome to the Shamrock hub</h1>
            <p className="title-paragraph">This is my lovely react site that I have thrown together. It's rough, it's unpolished but it will get there with time.</p>
            <p className='title-paragraph'>While you are here, enjoy the <a href='http://localhost:3000/tictactoe'>TicTacToe</a> and the <a href='http://localhost:3000/connectfour'>ConnectFour</a> games</p>
            <p className='title-paragraph'><a color="white"href='http://localhost:3000/weather'>Weather</a> here! <br/>Enter a ZIP code to get the weather of the city in it's respective state. </p>
            <p className='title-paragraph'>Bouncing ball <a href='http://localhost:3000/simulation'>simulation.</a> With each bounce the color changes. Simple, but good for learning Matter-js.</p>
            <p className='title-paragraph'><a href='http://localhost:3000/videoplayer'>Coding for dummies</a></p>
        </div>
    );
}

export default Home;
