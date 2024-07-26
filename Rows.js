import React from 'react';

function Rows(props) {
    
  return (
    <>
    
      {props.base.map( (item, index) => props.tumbler ? 
      props.isStatus(item, index): props.noStatus(item, index))}      
    </>)
}

export default Rows;