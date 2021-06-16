import React from 'react';

const Bird = (props) =>{
    return(
    <div>  
        Bird <input defaultValue={props.bird} type="text" id="bird" ></input> 
    
    </div>)


}

export default Bird;