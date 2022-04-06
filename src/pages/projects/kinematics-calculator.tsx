import React from 'react'

import './kinematics-calculator.css'

interface Props {}

interface State {
    initalVel_y: number,
    finalVel_y: number,
    averageVel_y: number,
    time_y: number,
    distance_y: number,
    acceleration_y: number,
    initalVel_x: number,
    finalVel_x: number,
    averageVel_x: number,
    time_x: number,
    distance_x: number,
    acceleration_x: number,

}
interface booleans extends State {
    solveXAxis: boolean,
    timeXYSame: boolean
}
interface checks extends booleans {
    eq1: number,
    eq2: number,
    eq3: number,
    eq1Pass: boolean,
    eq2Pass: boolean,
    eq3Pass: boolean,
    checkAnswerAmount: number
}
class KinematicsCalculator extends React.Component<Props, checks> {
    constructor(props: any) {
        super(props)
        this.calculateAnswer = this.calculateAnswer.bind(this)
    }
    public state: checks = {
        initalVel_y: NaN,
        finalVel_y: NaN,
        averageVel_y: NaN,
        time_y: NaN,
        distance_y: NaN,
        acceleration_y: -9.81,
        initalVel_x: NaN,
        finalVel_x: NaN,
        averageVel_x: NaN,
        time_x: NaN,
        distance_x: NaN,
        acceleration_x: 0,
        solveXAxis: false,
        timeXYSame: false,
        eq1: NaN,
        eq2: NaN,
        eq3: NaN,
        eq1Pass: false,
        eq2Pass: false,
        eq3Pass: false,
        checkAnswerAmount: 0.01
    }
    handleNumberChange = (event: any) => {
        event.preventDefault();
        this.setState({...this.state, [event.target.name]: parseFloat(event.target.value)})
    }
    createNumberInput(name:string) {
        return (
            <td>
                <input name={name} type="number" value={this.state[name as keyof State]} onChange={this.handleNumberChange}/>
            </td>
        )
    }
    
    calculateAnswer(e: any) {
        e.preventDefault()
        console.log("Executing script");
        console.log(this.state)
        var { initalVel_y, finalVel_y,averageVel_y,time_y,distance_y,acceleration_y,
            initalVel_x,finalVel_x,averageVel_x,time_x,distance_x,acceleration_x } = this.state
        // Gets all values from form
        // all the variables for the y axis
        let emptySpaces_y = 123;
        
        // If it is a number change it to a number and not a string
        if (this.state.timeXYSame && isNaN(time_y) && !isNaN(time_x)) {
            time_y = time_x;
        };
		let startedWithInital = false
		let startedWithFinal = false
		if (!isNaN(initalVel_y)) {startedWithInital = true}
		if (!isNaN(finalVel_y)) {startedWithFinal = true}
        let exitFlag = false;



        while (emptySpaces_y !== 0 && exitFlag === false) {
            console.log("solving for y axis");
            // create solved count
            emptySpaces_y = 0;
            let solveCount_y = 0;
            // Solves for average velocity if blank
            if (isNaN(averageVel_y)) {
                if (!isNaN(initalVel_y) && !isNaN(finalVel_y)) {
                    averageVel_y = (finalVel_y + initalVel_y) / 2;
                    solveCount_y++;
                } else if (!isNaN(distance_y) && !isNaN(time_y)) {
                    averageVel_y = distance_y / time_y;
                    solveCount_y++;
                };
            };
            // Solves for inital Velocity if blank
            if (isNaN(initalVel_y)) {
                if (!isNaN(averageVel_y) && !isNaN(finalVel_y)) {
                    initalVel_y = (averageVel_y * 2) - finalVel_y;
                    solveCount_y++;
                } else if (!isNaN(acceleration_y) && !isNaN(time_y) && !isNaN(finalVel_y)) {
                    initalVel_y = ((acceleration_y * time_y) - finalVel_y) * -1
                    solveCount_y++;
                } else if (!isNaN(finalVel_y) && !isNaN(acceleration_y) && !isNaN(distance_y)) {
                    initalVel_y = Math.sqrt(Math.pow(finalVel_y, 2) - (2 * acceleration_y * distance_y));
                    solveCount_y++;
                } else if (!isNaN(distance_y) && !isNaN(time_y) && !isNaN(acceleration_y)) {
                    initalVel_y = (distance_y - ((1 / 2) * (acceleration_y * Math.pow(time_y, 2)))) / time_y;
                    solveCount_y++;
                };
            };
            // Solves for final Velocity if blank
            if (isNaN(finalVel_y)) {
                if (!isNaN(averageVel_y) && !isNaN(initalVel_y)) {
                    finalVel_y = (averageVel_y * 2) - initalVel_y;
                    solveCount_y++;
                } else if (!isNaN(time_y) && !isNaN(initalVel_y) && !isNaN(acceleration_y)) {
                    finalVel_y = (acceleration_y * time_y) + initalVel_y;
                    solveCount_y++;
                } else if (!isNaN(distance_y) && !isNaN(initalVel_y) && !isNaN(acceleration_y)) {
                    finalVel_y = Math.sqrt(Math.pow(initalVel_y, 2) + (2 * acceleration_y * distance_y));
                    solveCount_y++;
                };
            };
            // solves for time_y if blank
            if (isNaN(time_y)) {
                if (!isNaN(averageVel_y) && !isNaN(distance_y)) {
                    time_y = distance_y / averageVel_y;
                    solveCount_y++;
                } else if (!isNaN(finalVel_y) && !isNaN(initalVel_y) && !isNaN(acceleration_y)) {
                    time_y = (finalVel_y - initalVel_y) / acceleration_y;
                    solveCount_y++;
                };
            };
            // solves for distance_y if blank
            if (isNaN(distance_y)) {
                if (!isNaN(averageVel_y) && !isNaN(time_y)) {
                    distance_y = averageVel_y * time_y;
                    solveCount_y++;
                } else if (!isNaN(finalVel_y) && !isNaN(initalVel_y) && !isNaN(acceleration_y)) {
                    distance_y = (Math.pow(finalVel_y, 2) - Math.pow(initalVel_y, 2)) / 2 / acceleration_y;
                    solveCount_y++;
                };
            };
            // solves for acceleration_y if blank
            if (isNaN(acceleration_y) && !isNaN(finalVel_y) && !isNaN(initalVel_y) && !isNaN(time_y)) {
                acceleration_y = (finalVel_y - initalVel_y) / time_y;
                solveCount_y++;
            };
            // creates the new array and checks for empty spaces
            const valueArray = [initalVel_y, finalVel_y, averageVel_y, time_y, distance_y, acceleration_y];
            console.log(valueArray);
            emptySpaces_y = 0;
            for (var index = 0; index < valueArray.length; index++) {
                if (isNaN(valueArray[index])) {
                    emptySpaces_y++;
                }
            };

            // If solvecount_y is equal to 0 and no values have changed, insufficient information
            console.log("Empty spaces " + emptySpaces_y);
            if (solveCount_y === 0 && emptySpaces_y !== 0) {
                alert("Insufficient information for y axis!");
                exitFlag = true;
            } else if (emptySpaces_y === 0) {
				if (Math.sign(finalVel_y - initalVel_y) !== Math.sign(acceleration_y)) {
					var temp = 0;
					if (startedWithFinal) {
						temp = initalVel_y
					} else if (startedWithInital) {
						temp = finalVel_y
					}
					// eslint-disable-next-line @typescript-eslint/no-redeclare
					var {initalVel_y, finalVel_y, averageVel_y, time_y, distance_y, acceleration_y,
					// eslint-disable-next-line @typescript-eslint/no-redeclare
						initalVel_x, finalVel_x, averageVel_x, time_x, distance_x, acceleration_x} = this.state
					emptySpaces_y = 1
					if (startedWithFinal) {
						initalVel_y = temp*-1
						startedWithFinal = false
					} else if (startedWithInital) {
						finalVel_y = temp*-1
						startedWithInital = false
					}
				} else {
					exitFlag = true;
				}

            }
			solveCount_y = 0
        };

        // sees if you want to solve the x-axis
        var solveXAxis = this.state.solveXAxis

        // Solves for x axis
        if (this.state.timeXYSame && isNaN(time_x) && !isNaN(time_y)) {
            time_x = time_y;
        };
        let emptySpaces_x = 123

        exitFlag = false;
        while (emptySpaces_x !== 0 && exitFlag === false && solveXAxis) {
            console.log("calculating for x axis");
            let solveCount_x = 0;
            // solves for initalvel if not there
            if (isNaN(initalVel_x)) {
                if (!isNaN(finalVel_x)) {
                    initalVel_x = finalVel_x;
                    solveCount_x++;
                } else if (!isNaN(averageVel_x)) {
                    initalVel_x = averageVel_x;
                    solveCount_x++;
                };
            };
            // solves for finalvel if not there
            if (isNaN(finalVel_x)) {
                if (!isNaN(initalVel_x)) {
                    finalVel_x = initalVel_x;
                    solveCount_x++;
                } else if (!isNaN(averageVel_x)) {
                    finalVel_x = averageVel_x;
                    solveCount_x++;
                };
            };
            // solves for average velocity if not there
            if (isNaN(averageVel_x)) {
                if (!isNaN(initalVel_x)) {
                    averageVel_x = initalVel_x;
                    solveCount_x++;
                } else if (!isNaN(finalVel_x)) {
                    averageVel_x = finalVel_x;
                    solveCount_x++;
                } else if (!isNaN(distance_x) && !isNaN(time_x)) {
                    averageVel_x = distance_x / time_x;
                    solveCount_x++;
                };
            };
            // solves for time if not there
            if (isNaN(time_x) && !isNaN(distance_x) && !isNaN(averageVel_x)) {
                time_x = distance_x / averageVel_x;
                solveCount_x++;
            };
            // solves for distance if not there
            if (isNaN(distance_x) && !isNaN(time_x) && !isNaN(averageVel_x)) {
                distance_x = averageVel_x * time_x;
                solveCount_x++;
            };
            // CHECKs for for empty spaces
            const valueArray_x = [initalVel_x, finalVel_x, averageVel_x, time_x, distance_x, acceleration_x];
            console.log(valueArray_x);
            emptySpaces_x = 0;
            for (index = 0; index < valueArray_x.length; index++) {
                if (isNaN(valueArray_x[(index)])) {
                    emptySpaces_x++;
                }
            };
            if (valueArray_x.includes(NaN)) {
                alert("No answer for X axis :(")
                break
            }
            console.log("Empty spaces " + emptySpaces_x);
            if (solveCount_x === 0 && emptySpaces_x !== 0) {
                alert("Insufficient information for x axis!");
                exitFlag = true;
            } else if (emptySpaces_x === 0) {
                exitFlag = true;
            } else { solveCount_x = 0 };

        };

        this.setState({...this.state, 
            initalVel_x: initalVel_x,
            finalVel_x: finalVel_x,
            averageVel_x: averageVel_x,
            time_x: time_x,
            distance_x: distance_x,
            acceleration_x: acceleration_x,
            initalVel_y: initalVel_y,
            finalVel_y: finalVel_y,
            averageVel_y: averageVel_y,
            time_y: time_y,
            distance_y: distance_y,
            acceleration_y: acceleration_y
        }, () => {
			
			const checkAmount = this.state.checkAnswerAmount
			var eq1Problem = finalVel_y - (initalVel_y + acceleration_y * time_y)
			var eq2Problem = distance_y - (initalVel_y * time_y + 0.5 * acceleration_y * time_y ** 2)
			var eq3Problem = finalVel_y ** 2 - (initalVel_y * initalVel_y + 2 * acceleration_y * distance_y)
			console.log(`Eq1 Problem offset ${eq1Problem}`)
			console.log(`Eq2 Problem offset ${eq2Problem}`)
			console.log(`Eq3 Problem offset ${eq3Problem}`)
			var eq1Pass = false
			var eq2Pass = false
			var eq3Pass = false
			if (Math.abs(eq1Problem) < checkAmount) {
				eq1Pass = true
			}
			if (Math.abs(eq2Problem) < checkAmount) {
				eq2Pass = true
			}
			if (Math.abs(eq3Problem) < checkAmount) {
				eq3Pass = true
			}
			this.setState({...this.state,
				eq1: eq1Problem,
				eq1Pass: eq1Pass,
				eq2: eq2Problem,
				eq2Pass: eq2Pass,
				eq3: eq3Problem,
				eq3Pass: eq3Pass
			})
		})
        //Checks

    }
    render() {
        return(
            <div className="container">
                <h1>Kinematics Calculator</h1>
                <form onSubmit={this.calculateAnswer}>
                    <table>
                        <tr>
                            <th>Axis</th>
                            <th>Inital Velocity (m/s)</th>
                            <th>Final Velocity (m/s)</th>
                            <th>Average Velocity (m/s)</th>
                            <th>Time (s)</th>
                            <th>Displacement (m)</th>
                            <th>Acceleration (m/s/s)</th>
                        </tr>
                        <tr>
                            <td className="axis">X</td>
                            {this.createNumberInput('initalVel_x')}
                            {this.createNumberInput('finalVel_x')}
                            {this.createNumberInput('averageVel_x')}
                            {this.createNumberInput('time_x')}
                            {this.createNumberInput('distance_x')}
                            {this.createNumberInput('acceleration_x')}
                        </tr>
                        <tr>
                            <td className="axis">Y</td>
                            {this.createNumberInput('initalVel_y')}
                            {this.createNumberInput('finalVel_y')}
                            {this.createNumberInput('averageVel_y')}
                            {this.createNumberInput('time_y')}
                            {this.createNumberInput('distance_y')}
                            {this.createNumberInput('acceleration_y')}
                        </tr>
                        <button className='btn'>Calculate Answer</button>
                    </table>
                    <input className="toggle"type="checkbox" name="solveXAxis" checked={this.state.solveXAxis} onChange={(e) => this.setState({...this.state, solveXAxis: !this.state.solveXAxis})}/>
                    <label htmlFor="solveXAxis" onClick={(e) => this.setState({...this.state, solveXAxis: !this.state.solveXAxis})}>Solve X Axis?</label>
                    <input className="toggle"type="checkbox" disabled={!this.state.solveXAxis} name="timeXYSame"checked={this.state.timeXYSame}/>
                    <label htmlFor="timeXYSame" onClick={(e) => {if (this.state.solveXAxis) {this.setState({ ...this.state, timeXYSame: !this.state.timeXYSame })}}}>Time for both axis the same?</label>
                </form>
				<br />
                <div id='checks'>
                    <table>
                        <th>Checks</th>
                        <tr>
                            <td>v<sub>f</sub> = v<sub>i</sub> + at</td>
							<td className={`checkAnswer ${this.state.eq1Pass ? "pass" : "fail"}`} id="eq1"> <b>{this.state.eq1Pass ? "PASS" : "FAIL"}</b> </td>
                        </tr>
                        <tr>
                            <td>d = v<sub>i</sub>t + <sup>1</sup>&frasl;<sub>2</sub>at<sup>2</sup></td>
							<td className={`checkAnswer ${this.state.eq2Pass ? "pass" : "fail"}`} id="eq2"> <b>{this.state.eq1Pass ? "PASS" : "FAIL"}</b> </td>
                        </tr>
                        <tr>
                            <td>v<sub>f</sub><sup>2</sup> = v<sub>i</sub><sup>2</sup> + 2ad</td>
							<td className={`checkAnswer ${this.state.eq3Pass ? "pass" : "fail"}`} id="eq3"> <b>{this.state.eq1Pass ? "PASS" : "FAIL"}</b> </td>
                        </tr>
                    </table>
                    How close does it need to be? <input type="number" id="checkAnswerAmount" value={this.state.checkAnswerAmount} onChange={(e) => this.setState({ ...this.state, checkAnswerAmount: parseFloat(e.target.value)})} />

                </div>
            </div>
        )
    }
}
export default KinematicsCalculator