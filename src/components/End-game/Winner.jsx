import React from 'react' 

function Winner(props) {



 return(<div className='result-backdrop'>
<div className='modal'>
<h3 style={{marginTop: '50px', fontSize: 'x-large'}} className='dialogue'>{props.winner} win!</h3>
<div  className='winner-image'></div>

<button onClick={props.cb} className='okay-button'>OK</button>
</div>
</div>)
}

export default Winner;