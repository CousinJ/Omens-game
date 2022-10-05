import React, {useState} from 'react'
import './SidePanel.css'


 let roleText = ''
let turnText = ''
let color = ''


function SidePanel(props) {

       
    if(props.data.role === 2) {
        roleText = 'speaker'
    }

    if(props.data.role === 1) {
        roleText = 'warlock'
    } 
    if(props.data.role === 0) {
        roleText = 'sage'
    }
    if(props.playing) {
        turnText = 'it is your turn'
    }
    if(props.playing === false) {
        turnText = 'NOT YOUR TURN'
    }
   if(props.playing === 'voted') {
    turnText = 'awaiting player  votes...'
   }
    
    const playerGallery = props.instance.map((el) => {
       
        
        if(props.data.role === 2) {
            if(el.role === 1) {
                color = 'red'
           }
           if(el.role === 0 ) {
                color = 'white'
           }
           
   
        } else {
            color = 'white'
        }

      

        return(<div style={{color: color}} className='player-box'>
            <div className='player-name-sq'>{el.id}.{el.player}</div>
            <div className='player-info-rect'>{el.weapon}, {el.skill} {el.house} </div>
        </div>)})

    return( <div className='side-panel'>
        <div className='self-bar'>
            <div className='name-box'>
            <h1>{props.data.player}</h1>
            </div>
        
        <h3>Player {props.data.id}</h3>
     

        <h3>{roleText}</h3>
        <h2>{turnText}</h2>
        
        </div>

        <div className='player-container'>
       
        {playerGallery}
        </div>
    </div>)
}
export default SidePanel;