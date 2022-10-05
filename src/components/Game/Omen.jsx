import React, { useState } from "react";
import "./Omen.css";


let array = [];

function Omen(props) {
  return (
    <div className="omen-main">
      <div
        onClick={() => {

            if(array.length === 3) {
                array = []
                props.cb([])
            } else {   array.push(props.omen)
                props.cb({ one: array[0], two: array[1], three: array[2] });}
                console.log(props.three)
         
        }}
        style={{ backgroundImage: `url(${props.omen})` }}
        className="omen"
      ></div>
    </div>
  );
}

export default Omen;
