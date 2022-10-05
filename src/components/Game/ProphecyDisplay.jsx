import React, {useState} from 'react' 
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function ProphecyDisplay() {
    socket.on('r-prophecy', (arg) => {
        setPropheticCouncil(arg)
    })
    const [propheticCouncil, setPropheticCouncil] = useState([])
    return(<div className='prophecy-main-display'>
        <div className='display-container'>
         <div style={{backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundImage: `url(${propheticCouncil.one})`}} className='proph-slot'></div>
        <div  style={{ backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat',backgroundImage: `url(${propheticCouncil.two})`}}  className='proph-slot'></div>
        <div   style={{backgroundSize: '100% 100%',  backgroundRepeat: 'no-repeat', backgroundImage: `url(${propheticCouncil.three})`}} className='proph-slot'></div>
        </div>
    </div>)
}

export default ProphecyDisplay;