import React from "react";

import './electrical-calculator.css'
interface variables {
	watts: number,
	volts: number,
	ohms: number,
	amps: number,
	power: number,
	wattsUnits: "tera" | "giga" | "mega" | "kilo" | "milli" | "micro" | "nano" | "pico" | "none",
	ohmsUnits: "tera" | "giga" | "mega" | "kilo" | "milli" | "micro" | "nano" | "pico" | "none",
	ampsUnits: "tera" | "giga" | "mega" | "kilo" | "milli" | "micro" | "nano" | "pico" | "none",
	voltsUnits: "tera" | "giga" | "mega" | "kilo" | "milli" | "micro" | "nano" | "pico" | "none",

}

class ElectricalCalculator extends React.Component {
	constructor(props: any) {
		super(props);
		this.calculateAnswer = this.calculateAnswer.bind(this)
	}
	public state: variables = {
		watts: NaN,
		volts: NaN,
		ohms: NaN,
		amps: NaN,
		power: NaN,
		wattsUnits: "none",
		voltsUnits: "none",
		ohmsUnits: "none",
		ampsUnits: "none",
		
	}

	createOptionBox(name: string) {
		return (
			<select id={name} className="electrical-optionbox" onChange={this.handleOptionChange}>
				<option value="Nothing"></option>
				<option value="tera">T (tera)</option>
				<option value="giga">G (giga)</option>
				<option value="mega">M (mega)</option>
				<option value="kilo">k (kilo)</option>
				<option value="milli">m (milli)</option>
				<option value="micro">μ (micro)</option>
				<option value="nano">n (nano)</option>
				<option value="pico">P (pico)</option>
			</select>
		)
	}
	handleNumberChange = (event: any) => {
		event.preventDefault();
		this.setState({ ...this.state, [event.target.name]: parseFloat(event.target.value) })
		console.log(this.state)
	}
	handleOptionChange = (event: any) => {
		event.prevetnDefault();
		const name = event.target.name
		const value = event.target.value
		this.setState({name, value })
	}
	createNumberInput(name: string) {
		return (
				<input className="electrical-input" name={name} type="number" value={this.state[name as keyof variables]} onChange={this.handleNumberChange} />
		)
	}
	calculateAnswer(y: any) {
		y.preventDefault()
		var p = this.state.watts
		var e = this.state.volts
		var r = this.state.ohms
		var i = this.state.amps
		for (var j=0; j<2; j++) {
			console.log("values for loop")
			console.log([p, e, r, i])
			if (isNaN(p)) {
				if (!(isNaN(e) && isNaN(r))) {
					p = (e*e)/r
				}
				else if (!(isNaN(r) && isNaN(i))) {
					p = r * i * i
				}
				else if (!(isNaN(e) && isNaN(i))) {
					p = (e * i)
				}
			}
			if (isNaN(e)) {
				if (!(isNaN(p) && isNaN(r))) {
					console.log("in here")
					e = Math.sqrt((p*r))
				}
				else if (!(isNaN(r) && isNaN(i))) {
					e = r * i
				}
				else if (!(isNaN(p) && isNaN(i))) {
					e = (p / i)
				}
			}
			if (isNaN(r)) {
				if (!(isNaN(p) && isNaN(i))) {
					r = p / (i*i)
				}
				else if (!(isNaN(e) && isNaN(p))) {
					r = (e*e)/p
				}
				else if (!(isNaN(e) && isNaN(i))) {
					r = e/i
				}
			}
			if (isNaN(i)) {
				if (!(isNaN(p) && isNaN(r))) {
					i = Math.sqrt(p / r)
				}
				else if (!(isNaN(p) && isNaN(e))) {
					i = p / e
				}
				else if (!(isNaN(e) && isNaN(r))) {
					i = e/r
				}
			}
		}
		this.setState({watts: p, volts: e, amps: i, ohms: r})
	}
	render() {
		return (
			<>
			<h1>Electrical Calculator</h1>
			<form onSubmit={this.calculateAnswer}>
				<table id="electrical-table">
					<tr>
						<td>
							Input Watts (P):
						</td>
						<td>
							{this.createNumberInput('watts')}
						</td>
						<td>
							{this.createOptionBox("wattsUnits")}
						</td>
					</tr>
					<tr>
						<td>
							Input Volts (E):
						</td>
						<td>
							{this.createNumberInput('volts')}
						</td>
						<td>
							{this.createOptionBox("voltsUnits")}
						</td>
					</tr>
					<tr>
						<td>
							Input Ohms (R):
						</td>
						<td>
							{this.createNumberInput('ohms')}
						</td>
						<td>
							{this.createOptionBox("ohmsUnits")}
						</td>
					</tr>
					<tr>
						<td>
							Input Amps (I):
						</td>
						<td>
							{this.createNumberInput('amps')}
						</td>
						<td>
							{this.createOptionBox("ampsUnits")}
						</td>
					</tr>

				</table>
					<button className='electrical-button'>Calculate Answer</button>
					<button className='electrical-button' onClick={() => {this.setState({ohms: NaN, watts: NaN, volts: NaN, amps: NaN})}}>Reset Values</button>
			</form>

			
			</>
		)
	}
}
export default ElectricalCalculator