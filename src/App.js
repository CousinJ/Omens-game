import React, { useState } from "react";
import io from "socket.io-client";

import Landing from "./components/Landing";
import Loading from "./components/Loading";
import Game from "./components/Game/Game";
import SendOff from "./components/End-game/SendOff";

import "./App.css";
const socket = io.connect("http://localhost:3001");

function App() {

  const audio = new Audio('./music/Splendor Board Game Background Ambience _ Busy Marketplace _ 2 Hours (128 kbps).mp3')

 

  const [view, setView] = useState("Landing");
  const [gameData, setGameData] = useState('')
  const [instance, setInstance] =useState('')
    
  //listens to people leaving game...
  socket.on('reset-instance', (arg) => {
    setInstance(arg)
  })

  return (
    <div className="App">
      {view === "Landing" && <Landing data={gameData} cb2={setGameData} view={view} cb={setView}></Landing>}
      {view === "Loading" && <Loading setInstance={setInstance} data={gameData} cb2={setGameData} view={view} cb={setView}></Loading>}
      {view === "Game" && <Game setView={setView} setInstance={setInstance} instance={instance} data={gameData} setData={setGameData}></Game>}
      {view === 'Exit' && <SendOff data={gameData}></SendOff> }
    </div>
  );
}

export default App;
