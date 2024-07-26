import React from 'react';
import Rows from './Rows';
import styles from './Learned.module.css';
import classes from "./Buttons.module.css"; 

function Learned (props) {
	return (
		<div class ={styles.learned}>
		  <button class = {classes.btn5} onClick = {() => {props.show()}}>
			Learned / Not learned
			</button>
		<table class ={styles.learned.table} >
			<thead >
				<tr >
					<td>English</td>
					<td>Перевод</td>
        	<td>Выучено</td>
				</tr>
			</thead>
			<tbody>
        <Rows 
          base = {props.base}
          tumbler = {props.tumbler}
          setTumbler = {props.setTumbler}
          isStatus = {props.isStatus}
          noStatus = {props.noStatus}
          show = {props.show}
        />
			</tbody>
		</table>
		</div>
	)
}

export default Learned;