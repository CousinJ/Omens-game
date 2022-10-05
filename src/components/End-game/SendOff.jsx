import React from 'react' 
import './SendOff.css'
//socket.io
import io from "socket.io-client"; 
const socket = io.connect("http://localhost:3001");

function SendOff(props) {
    // check to see if warlocks won or if all of them are dead.

    socket.emit('exiting', props.data)

    socket.emit('check-win', props.data)
    
    return(<div className='send-off-main'>
       



<div className='summary-div'>      </div>

<h2 className='text-summ'>Thanks for playing {props.data.player}!

....you were voted out </h2>

    </div>)
}

export default SendOff;