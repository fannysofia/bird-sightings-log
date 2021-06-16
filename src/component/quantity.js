import React from 'react';

const Quantity = (props) =>{
    return(
    <div>   
        Quantity <input defaultValue={props.quantity} type="number" id="quantity"></input>       
    </div>)



}

export default Quantity;