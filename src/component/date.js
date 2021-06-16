import React from 'react';

const Date = (props) =>{
    return(
    <div>   
        Date <input defaultValue={props.date} type="date" id="date"></input>       
    </div>)



}

export default Date;