import React, {useState} from 'react' 
import './ProphecyMaker.css'
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");


function ProphecyMaker(props) {
    
const sendProphecy = () => {
   //ERROR AND PREVENT HERE with props.playing
   
    socket.emit('sending-prophecy', props.three )
    //first change in who is playing the game. set all other players to true at this time. It will change back to player 1s turn when the list of all their votes are equal to all the players.length - 1.
    socket.emit('switch-play')

}

    return(<div className='prophecy-main'>
        
        <div style={{ backgroundRepeat: 'no-repeat', backgroundImage: `url(${props.three.one})`}} className='proph-slot'></div>
        <div  style={{ backgroundRepeat: 'no-repeat', backgroundImage: `url(${props.three.two})`}}  className='proph-slot'></div>
        <div   style={{ backgroundRepeat: 'no-repeat', backgroundImage: `url(${props.three.three})`}} className='proph-slot'></div>
        
     <button onClick={sendProphecy} className='submit-proph'>submit</button>
     
         </div>)
}

export default ProphecyMaker;