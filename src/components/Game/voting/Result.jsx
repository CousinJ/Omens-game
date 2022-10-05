import React from 'react' 
import './Result.css'
function Result(props) {
    return(<div className='result-backdrop'>
        <div className='modal'>
    <h3 className='dialogue'>The player voted out is...</h3>
    <h2>{props.playerVotedOut}</h2>
   
    <button onClick={props.cb} className='okay-button'>OK</button>
    </div>
    </div>)
}

export default Result;