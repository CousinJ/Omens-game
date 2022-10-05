import React, { useState } from "react";
import "./Game.css";

//components
import SidePanel from "./SidePanel";
import CardFountain from "./CardFountain";
import ProphecyMaker from "./ProphecyMaker";
import ProphecyDisplay from "./ProphecyDisplay";
import Voter from "./voting/Voter";
import Result from "./voting/Result";
import Winner from "../End-game/Winner";
//assets  ====  omens
import fireOmen from '../../assets/omens-bank/firee.png'
import truthOmen from '../../assets/omens-bank/truth.png'
import bloodOmen from '../../assets/omens-bank/blood.png'
import windOmen from '../../assets/omens-bank/wind.png'
import iceOmen from '../../assets/omens-bank/ice.png'
import lightOmen from '../../assets/omens-bank/light.png'
import plagueOmen from '../../assets/omens-bank/plague.png'
import metalOmen from '../../assets/omens-bank/metal.png'
import earthOmen from '../../assets/omens-bank/earth.png'
import shadowOmen from '../../assets/omens-bank/shadow.png'
import natureOmen from '../../assets/omens-bank/nature.png'
import waterOmen from '../../assets/omens-bank/water.png'
import spiritOmen from '../../assets/omens-bank/spirit.png'
import cloudOmen from '../../assets/omens-bank/cloud.png'
import arcaneOmen from '../../assets/omens-bank/arcanee.png'
import lightningOmen from '../../assets/omens-bank/lightning.png'
import venomOmen from '../../assets/omens-bank/venom.png'
import lifeOmen from '../../assets/omens-bank/life.png'
import timeOmen from '../../assets/omens-bank/time.png'
import chaosOmen from '../../assets/omens-bank/chaos.png'
import mindOmen from '../../assets/omens-bank/mind.png'

//importing warlock and sage symbols 


//socket.io
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
//===============================================================================
function Game(props) {
let winImage = ''


  const [playing, setPlaying] = useState(props.data.playing);


  //this is for the voting results...
  const [showingResult, setShowingResult] = useState(false)
  const [showingWin, setShowingWin] = useState(false)
  const [winner, setWinner] = useState('')
  const [playerVotedOut, setPlayerVotedOut]  =useState('')


//this function is to close the result component.
  const okHandler = () => {
    if(playerVotedOut === 'You') {
      props.setView('Exit')
    }
    setShowingResult(false)
  }
// this function is to close the winner component
const okHandlerWin = () => {
  setShowingWin(false)
}


//sets turn from speaker to council members.
  socket.on("turnt", (arg) => {

    setPlaying(!playing);
  });
// listener for the backend vote system
  socket.on('vote-final', (votedPlayer) => {
    
    if(votedPlayer.name === props.data.player) {
      setPlayerVotedOut('You')
    } else {
      setPlayerVotedOut(votedPlayer.name)
    }
    
    setShowingResult(true)
    
  })
// listener for the winning side...
socket.on('see-win', (arg) => {
  setWinner(arg)
  setShowingWin(true)
})






  //prophecy variables to be set 1 2 and 3.
  const [three, setThree] = useState({ one: "", two: "", three: "" });

  return (
    <div className="game-div">
      {showingResult && <Result cb={okHandler} playerVotedOut={playerVotedOut}></Result> }
      {showingWin && <Winner winnerImage={winImage}cb={okHandlerWin} winner={winner} ></Winner>}
      <SidePanel instance={props.instance} playing={playing} data={props.data}></SidePanel>

      {props.data.turn === true && (
        <CardFountain
          three={three}
          setThree={setThree}
          cards={[
            fireOmen,
            cloudOmen,
            timeOmen,
            natureOmen,
            bloodOmen,
            truthOmen,
            waterOmen,
            earthOmen,
            spiritOmen,
            metalOmen,
            windOmen,
            shadowOmen,
            lifeOmen,
            mindOmen,
            lightOmen,
            venomOmen,
            iceOmen,
            plagueOmen,
            arcaneOmen,
            lightningOmen,
            chaosOmen,

          ]}
        ></CardFountain>
      )}
      {props.data.turn === true && (
        <ProphecyMaker three={three}></ProphecyMaker>
      )}

      {props.data.turn === false && <ProphecyDisplay></ProphecyDisplay>}
      {props.data.turn === false && <Voter data={props.data} instance={props.instance}></Voter>}
    </div>
  );
}
export default Game;
