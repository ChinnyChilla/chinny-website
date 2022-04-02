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
    acceleration_x: number
}
class KinematicsCalculator extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        this.calculateAnswer = this.calculateAnswer.bind(this)
    }
    public state: State = {
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
        acceleration_x: 0
    }
    handleChange = (event: any) => {
        event.preventDefault();
        this.setState({...this.state, [event.target.name]: parseFloat(event.target.value)})
    }
    createInput(name:string) {
        return (
            <td>
                <input name={name} type="number" value={this.state[name as keyof State]}onChange={this.handleChange}/>
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
        // if (document.getElementById("same-xy-time").checked && isNaN(time_y) && isNaN(time_x)) {
        //     time_y = time_x;
        // };


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
                exitFlag = true;
            } else { solveCount_y = 0 };
        };

        // sees if you want to solve the x-axis
        // var solveXAxis = document.getElementById("solve-x-axis").checked;

        // Solves for x axis
        // if (document.getElementById("same-xy-time").checked && isNaN(time_x) && isNaN(time_y)) {
        //     time_x = time_y;
        // };
        let emptySpaces_x = 123
        let solveXAxis = true
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
                if (valueArray_x[(index)]) {
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

        this.setState({
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
        })
        // Checks
        // const checkAmount = parseFloat(document.getElementById('checkAnswerAmount').value)
        // eq1Problem = finalVel_y - (initalVel_y + acceleration_y * time_y)
        // eq2Problem = distance_y - (initalVel_y * time_y + 0.5 * acceleration_y * time_y ** 2)
        // eq3Problem = finalVel_y ** 2 - (initalVel_y * initalVel_y + 2 * acceleration_y * distance_y)
        // console.log(`Eq1 Problem offset ${eq1Problem}`)
        // console.log(`Eq2 Problem offset ${eq2Problem}`)
        // console.log(`Eq3 Problem offset ${eq3Problem}`)
        // if (Math.abs(eq1Problem) < checkAmount) {
        //     document.getElementById('eq1').setAttribute("style", "background-color: #90EE90")
        //     document.getElementById('eq1').innerText = "PASS"
        // } else {
        //     document.getElementById('eq1').setAttribute("style", "background-color: red")
        //     document.getElementById('eq1').innerText = `FAIL\nFailed by ${eq1Problem.toFixed(checkAmount.toString().length)}`

        // }
        // if (Math.abs(eq2Problem) < checkAmount) {
        //     document.getElementById('eq2').setAttribute("style", "background-color: #90EE90")
        //     document.getElementById('eq2').innerText = "PASS"
        // } else {
        //     document.getElementById('eq2').setAttribute("style", "background-color: red")
        //     document.getElementById('eq2').innerText = `FAIL\nFailed by ${eq2Problem.toFixed(checkAmount.toString().length)}`
        // }
        // if (Math.abs(eq3Problem) < checkAmount) {
        //     document.getElementById('eq3').setAttribute("style", "background-color: #90EE90")
        //     document.getElementById('eq3').innerText = "PASS"
        // } else {
        //     document.getElementById('eq3').setAttribute("style", "background-color: red")
        //     document.getElementById('eq3').innerText = `FAIL\nFailed by ${eq3Problem.toFixed(checkAmount.toString().length)}`
        // }
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
                            <td>X</td>
                            {this.createInput('initalVel_x')}
                            {this.createInput('finalVel_x')}
                            {this.createInput('averageVel_x')}
                            {this.createInput('time_x')}
                            {this.createInput('distance_x')}
                            {this.createInput('acceleration_x')}
                        </tr>
                        <tr>
                            <td>Y</td>
                            {this.createInput('initalVel_y')}
                            {this.createInput('finalVel_y')}
                            {this.createInput('averageVel_y')}
                            {this.createInput('time_y')}
                            {this.createInput('distance_y')}
                            {this.createInput('acceleration_y')}
                        </tr>
                        <button>Calculate Answer</button>
                    </table>

                </form>
            </div>
        )
    }
}
export default KinematicsCalculator