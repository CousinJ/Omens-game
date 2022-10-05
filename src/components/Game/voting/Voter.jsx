import React from 'react'
import './Voter.css' 


import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");



function Voter(props) {

   
    


    const players = props.instance.map((el, i) => {return(<div key={i} className='others-bar'>
        <div className='box'><h4 className='player-name'>{el.player}</h4></div>
       <button className='vote-button' onClick={() => {
               //ERROR AND PREVENT HERE with props.playing

                socket.emit('vote-out', el)
            
            
        
        }}>vote {el.player}</button>
    </div>)})
    return(<div className='vote-main'>
      
        {players}
    </div>)
}

export default Voter;