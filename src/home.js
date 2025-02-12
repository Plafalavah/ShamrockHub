import React from 'react';
import './index.css';

function Home() {
    return (
        <div className="home">
            <header>
                <h1 className="title">Welcome to the Shamrock Hub</h1>
            </header>
            <main>
                <section className="intro">
                    <h2 className="title-paragraph">
                        This is my lovely React site that I have thrown together. It's rough, it's unpolished but it will get there with time.
                    </h2>
                </section>
                <section className="title-paragraph">
                    <h2 className='heading'>Games</h2>
                    <ul>
                        <li>
                            <a href="http://localhost:3000/tictactoe">TicTacToe</a>
                        </li>
                        <li>
                            <a href="http://localhost:3000/connectfour">ConnectFour</a>
                        </li>
                    </ul>
                </section>
                <section>
                    <h2 className="heading">Weather</h2>
                    <p className="title-paragraph">
                        <a href="http://localhost:3000/weather">Weather</a> here! <br />
                        Enter a ZIP code to get the weather of the city in its respective state.
                    </p>
                </section>
                <section className="heading">
                    <h2 className="heading">Simulation</h2>
                    <p className="title-paragraph">
                        Bouncing ball <a href="http://localhost:3000/simulation">simulation</a>. With each bounce, the color changes. Simple, but good for learning Matter-js.
                    </p>
                </section>
                <section className="heading">
                    <h2 className="heading">Video Player</h2>
                    <p className="title-paragraph">
                        <a href="http://localhost:3000/videoplayer">Videoplayer (in-work)</a>
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Home;
