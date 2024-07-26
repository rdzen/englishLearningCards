import React from 'react';
import styles from "./Card.module.css"; 
import classes from "./Buttons.module.css"; 

function Card(props) {
  return (
    <div >
      <div class ={styles.card} >
          { props.toggle ? props.textCard.en : props.textCard.ru}       
      </div>

      <button class = {classes.btn1} onClick = {props.know}>Know</button>
      <button class = {classes.btn2} onClick = {props.dontKnow}>Don't know</button>
      <br/>
        
      {props.resetText ? <div style ={{color:'red'}}> {props.resetText} </div>: null}
      
      <button class = {classes.btn4} onClick = {props.reset}> Reset</button>
    </div>
  );
}

export default Card;