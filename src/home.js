import React from 'react';
import './styles/index.css';

function Home() {
    return (
        <div className="home">
            <header>
                <h1 className="title focus-in-expand">Welcome to the Shamrock Hub</h1>
            </header>
            <main>
                <section className="intro">
                    <h2 className="typewriter">
                        This is my lovely React site that I have thrown together.
                    </h2>
                </section>
                <section className="title-paragraph">
                    <div className="book">
                        <ul>
                            <li>
                                <a href="http://localhost:3000/tictactoe">Tic-Tac-Toe</a>
                            </li>
                            <li>
                                <a href="http://localhost:3000/connectfour">ConnectFour</a>
                            </li>
                        </ul>
                        <div className="cover">
                            <div className="card-content">
                            <p>Games</p>
                        </div></div>
                    </div>
                        <div className="book">
                            <ul>
                                <li>
                                    <a href="http://localhost:3000/weather">Weather by ZIP</a>
                                </li>
                                <li>
                                    <a href="http://localhost:3000/">Placeholder</a>
                                </li>
                            </ul>
                            <div className="cover">
                                <p>Weather</p>
                            </div>
                        </div>
                        <div className="book">
                            <ul>
                                <li>
                                    <a href="http://localhost:3000/simulation">Bouncing ball simulation</a>
                                </li>
                                <li>
                                    <a href="http://localhost:3000/">Placeholder</a>
                                </li>
                            </ul>
                            <div className="cover">
                                <p>Simulation</p>
                            </div>
                        </div>
                        <div className="book">
                            <ul>
                                <li>
                                    <a href="http://localhost:3000/simulation">Coding Video</a>
                                </li>
                                <li>
                                    <a href="http://localhost:3000/">Placeholder</a>
                                </li>
                            </ul>
                            <div className="cover">
                                <p>Videoplayer</p>
                            </div>
                        </div>
                    </section>
                    <section className="site-description">
                        <h2>What is the Shamrock Hub?</h2>
                        <p>This is my own personal React playground. I take different ideas and mash them together into...this abomination.</p>
                    </section>
            </main>
        </div>
    );
}

export default Home;
