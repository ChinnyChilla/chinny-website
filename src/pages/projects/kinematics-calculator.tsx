// import React from 'react'

// function calculator(this: any) {
// 	function sameXyTime() {
// 		return (
// 			<>
				
// 			</>
// 		)
// 	}
// 	function checkChecked() {
// 		if () {
// 			return document.getElementById("same-xy-time").disabled = false;
// 		}
// 		return document.getElementById("same-xy-time").disabled = true;
// 	}

// 	return (
// 		<div>
// 			<h2>Kenimatics variable table calculator</h2>
// 			<h3>Leave the boxes blank if no number!</h3>
// 			<form name="Kenimatics calculator table" id="KenimaticsTable">
// 				<table>
// 					<tr>
// 						<th>Axis</th>
// 						<th>Inital Velocity</th>
// 						<th>Final Velocity</th>
// 						<th>Average Velocity</th>
// 						<th>Time</th>
// 						<th>Distance (Displacement)</th>
// 						<th>Acceleration</th>
// 					</tr>
// 					<tr>
// 						<th>X</th>
// 						<td><input type="number" name="inital_velocity" id="x_inital_velocity"/></td>
// 						<td><input type="number" name="final_velocity" id="x_final_velocity"/></td>
// 						<td><input type="number" name="average_velocity" id="x_average_velocity"/></td>
// 						<td><input type="number" name="time" id="x_time"/></td>
// 						<td><input type="number" name="distance" id="x_distance"/></td>
// 						<td><input type="number" name="Acceleration" id="x_acceleration" value="0"/></td>
// 					</tr>
// 					<tr>
// 						<th>Y</th>
// 						<td><input type="number" name="inital_velocity" id="y_inital_velocity"/></td>
// 						<td><input type="number" name="final_velocity" id="y_final_velocity"/></td>
// 						<td><input type="number" name="average_velocity" id="y_average_velocity"/></td>
// 						<td><input type="number" name="time" id="y_time"/></td>
// 						<td><input type="number" name="distance" id="y_distance"/></td>
// 						<td><input type="number" name="Acceleration" id="y_acceleration" value="9.81"/></td>
// 					</tr>
// 				</table>
// 				<input type="button" value="Calculate" id="kinematicCalculate"/>
// 				<input type="reset" value="Clear all values"/>
// 				<br/>
// 				<input type="checkbox" id="solve-x-axis" className="toggle" onClick={checkChecked}/><label htmlFor="solve-x-axis">Solve for the x-axis?</label>
// 				<br/>
// 				<input disabled type="checkbox" id="same-xy-time" className="toggle" /><label htmlFor="same-xy-time">Time for x and y axis is the same?</label>
// 			</form>
// 			<br/>
// 				<div id='checks'>
// 					<table>
// 						<th>Checks</th>
// 						<tr>
// 							<td>v<sub>f</sub> = v<sub>i</sub> + at</td>
// 							<td className="checkAnswer" id="eq1"> - </td>
// 						</tr>
// 						<tr>
// 							<td>d = v<sub>i</sub>t + <sup>1</sup>&frasl;<sub>2</sub>at<sup>2</sup></td>
// 							<td className="checkAnswer" id="eq2"> - </td>
// 						</tr>
// 						<tr>
// 							<td>v<sub>f</sub><sup>2</sup> = v<sub>i</sub><sup>2</sup> + 2ad</td>
// 							<td className="checkAnswer" id="eq3"> - </td>
// 						</tr>
// 					</table>
// 					How close does it need to be? <input type="number" id="checkAnswerAmount" value="0.01"/>

// 				</div>
// 		</div>
// 	)
// }

export {}