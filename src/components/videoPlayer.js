import React, { useState } from "react";
import ReactDOM from "react-dom";
import YouTube from "@u-wave/react-youtube";
import "./videoplayer.css";

function VideoPlayer() {
  const [player, setPlayer] = useState(null); // Store YouTube player instance

  return (
    <div className="App">
      <h1>Coding Video</h1>

      <h2>Youtube</h2>
      <YouTube
        video="q-_ezD9Swz4"
        autoplay
        muted
        height={500}
        width={1000}
        onReady={(event) => setPlayer(event.target)}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<VideoPlayer />, rootElement);

export default VideoPlayer;
