import React from "react";
import Picture from './birds.jpg';

const ComponentName = (props) => {
    return <div class="borderStyle">
      <h1>Bird sightings log {props.year}</h1>
      <img src={Picture} alt="birdwatching"></img>
      </div>;
  };

export default ComponentName;