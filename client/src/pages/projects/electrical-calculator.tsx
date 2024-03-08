import React from "react";

import './electrical-calculator.css'
interface variables {
	watts: string,
	volts: string,
	ohms: string,
	amps: string,
	power: string,
	wattsUnits:  "mega" | "kilo" | "milli" | "micro" | "none",
	ohmsUnits:  "mega" | "kilo" | "milli" | "micro" | "none",
	ampsUnits:  "mega" | "kilo" | "milli" | "micro" | "none",
	voltsUnits:  "mega" | "kilo" | "milli" | "micro" | "none",
	activeTab: string;
	activeTabHtml: any;
	isSeries: boolean;
	text: string;
	result: any;
}

class ElectricalCalculator extends React.Component {
	constructor(props: any) {
		super(props);
		this.calculateDcAnswer = this.calculateDcAnswer.bind(this)
		this.calculatecspAnswer = this.calculatecspAnswer.bind(this)
	}
	public state: variables = {
		watts: "",
		volts: "",
		ohms: "",
		amps: "",
		power: "",
		wattsUnits: "none",
		voltsUnits: "none",
		ohmsUnits: "none",
		ampsUnits: "none",
		activeTab: "",
		activeTabHtml: "",
		isSeries: true,
		text: "Series",
		result: null,
	}

	createOptionBox(name: string) {
		return (
			<select name={name} className="electrical-optionbox" onChange={this.handleOptionChange}>
				<option value="Nothing"></option>
				<option value="mega">M (mega)</option>
				<option value="kilo">k (kilo)</option>
				<option value="milli">m (milli)</option>
				<option value="micro">μ (micro)</option>
			</select>
		)
	}
	handleNumberChange = (event: any) => {
		event.preventDefault();
		this.setState({ ...this.state, [event.target.name]: event.target.value})
		console.log(this.state)
	}
	handleOptionChange = (event: any) => {
		event.preventDefault();
		const name2:string = event.target.name;
		const value = event.target.value
		this.setState({...this.state, [name2]: [value] })
	}
	createNumberInput(name: string) {
		return (
				<input className="electrical-input" name={name} type="text" value={this.state[name as keyof variables]} onChange={this.handleNumberChange} />
		)
	}
	calculateDcAnswer(y: any) {
		console.log("in cacluate answer")
		y.preventDefault()
		var p = NaN;
		var e = NaN;
		var r = NaN;
		var i = NaN;
		try {
			p = parseFloat(this.state.watts)
			e = parseFloat(this.state.volts)
			r = parseFloat(this.state.ohms)
			i = parseFloat(this.state.amps)
		} catch (err) {
			alert(err)
		}
		var x = 0
		var multiplier = { "mega": 1_000_000, "kilo": 1_000, "milli":0.001, "micro": 0.000_001,"none":1 }
		
		if (!isNaN(p)) {
			x+=1
			p = p * multiplier[this.state.wattsUnits]
		}
		if (!isNaN(e)) {
			x += 1
			e = e * multiplier[this.state.voltsUnits]
		} 
		if (!isNaN(r)) {
			x += 1
			r = r * multiplier[this.state.ohmsUnits]
		} 
		if (!isNaN(i)) {
			x += 1
			i = i * multiplier[this.state.ampsUnits]
		}
		if (x < 2) {
			alert("Not enough data points")
			return;
		}
		else if (x>2){
			alert("Too Many Variables")
			return;
		}

		for (var j=0; j<2; j++) {
			console.log("values for loop")
			console.log([p, e, r, i])


			if (isNaN(p)) {
				if (!(isNaN(e) || isNaN(r))) {
					p = (e*e)/r
				}
				else if (!(isNaN(r) || isNaN(i))) {
					p = r * i * i
				}
				else if (!(isNaN(e) || isNaN(i))) {
					p = (e * i)
				}
			}
			if (isNaN(e)) {
				if (!(isNaN(p) || isNaN(r))) {
					e = Math.sqrt((p*r))
				}
				else if (!(isNaN(r) || isNaN(i))) {
					e = r * i
				}
				else if (!(isNaN(p) || isNaN(i))) {
					e = (p / i)
				}
			}
			if (isNaN(r)) {
				if (!(isNaN(e) || isNaN(p))) {
					r = (e*e)/p
				}
				else if (!(isNaN(p) || isNaN(i))) {
					r = p / (i*i)
				}
				else if (!(isNaN(e) || isNaN(i))) {
					r = e/i
				}
			}
			if (isNaN(i)) {
				if (!(isNaN(p) || isNaN(r))) {
					i = Math.sqrt(p / r)
				}
				else if (!(isNaN(p) || isNaN(e))) {
					i = p / e
				}
				else if (!(isNaN(e) || isNaN(r))) {
					i = e/r
				}
			}
		}
		if (!isNaN(p)) {
			x += 1
			p = p / multiplier[this.state.wattsUnits]
		}
		if (!isNaN(e)) {
			x += 1
			e = e / multiplier[this.state.voltsUnits]
		}
		if (!isNaN(r)) {
			x += 1
			r = r / multiplier[this.state.ohmsUnits]
		}
		if (!isNaN(i)) {
			x += 1
			i = i / multiplier[this.state.ampsUnits]
		}
		this.setState({watts: p, volts: e, amps: i, ohms: r})
	}
	renderdcTab() {
		console.log("talked")
		return <form onSubmit={this.calculateDcAnswer}>
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
						Input Ohms (R): \n Use a * for power emmision
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
			<button className='electrical-button' type="reset" onClick={() => {this.setState({ ohms: "", watts: "", volts: "", amps: "" }) }}>Reset Values</button>
		</form>
	}
	calculatecspAnswer(e: any) {
		e.preventDefault();
		var ohms = this.state.ohms.trim()
		var volts = this.state.volts.trim()
		var ohmsSplit= ohms.split(" ")
		var voltsSplit = volts.split(" ")
		var ohmsNumbers = []
		var voltsNumbers = []
		var ohmsImportant = []
		try {
			for (var i = 0; i < ohmsSplit.length; i++) {
				if (ohmsSplit[i].endsWith("*")) {
					console.log("Found an astricks")
					ohmsImportant.push(i)
				}
			}
			ohmsSplit = ohms.replace("*", "").split(" ")
			for (i=0; i<ohmsSplit.length; i++) {
				ohmsNumbers[i] = parseFloat(ohmsSplit[i])
			}
			for (var k= 0; k < voltsSplit.length; k++) {
				console.log(parseFloat(voltsSplit[k]))
				voltsNumbers[k] = parseFloat(voltsSplit[k])
			}
		} catch (err) {
			alert(err)
		}
		var totalOhms = 0
		ohmsNumbers.forEach(ohm => {
			totalOhms += ohm
		})
		var totalVolts = 0
		console.log(voltsNumbers)
		voltsNumbers.forEach(volt => {
			totalVolts += volt
		})
		console.log(totalVolts)
		var amp = totalVolts / totalOhms
		var volt_drop = []
		var power_drop:number[] = []
		for (i=0; i<ohmsNumbers.length;i++) {
			volt_drop[i] = ohmsNumbers[i] * amp

			
			var amp2= amp** 2
			power_drop[i] = amp2 * ohmsNumbers[i]
		}
		
		var output:number[] = []
		console.log("Ohms important")
		console.log(ohmsImportant)
		ohmsImportant.forEach(index => {
			output.push(power_drop[index])
		})
		var total_power = 0
		power_drop.forEach(p => {
			total_power += p;
		});

		var eff = output.reduce((a, b) => a+b, 0) / total_power * 100
		console.log(output);
		var result = {
			totalVoltage: totalVolts,
			totalAmperage: amp,
			totalResistance: totalOhms,
			Voltage_drop: volt_drop.toString(),
			totalPower: total_power,
			usefulPower: output.toString(),
			efficiency: eff, 
		}
		this.setState({...this.state, result})
	}
	renderdcspTab() {
		return <form onSubmit={this.calculatecspAnswer}>
			<table id="electrical-table">
				<tr>
					<td>
						Input Volts (E):
					</td>
					<td>
						{this.createNumberInput('volts')}
					</td>
				</tr>
				<tr>
					<td>
						Input Ohms (R):
					</td>
					<td>
						{this.createNumberInput('ohms')}
					</td>
				</tr>

			</table>
			<input className="toggle" type="checkbox" name="solveXAxis" checked={this.state.isSeries} onChange={(e) => {this.setState({ ...this.state, isSeries: !this.state.isSeries })
		}} />
			<label htmlFor="isSeries" onClick={(e) => this.setState({ ...this.state, isSeries: !this.state.isSeries })}>{this.state.isSeries && "Current: Series"}{!this.state.isSeries && "Current: Parallel"}</label>
			<button className='electrical-button'>Calculate Answer</button>
			<button className='electrical-button' type="reset" onClick={() => { this.setState({ ohms: "", volts: ""}) }}>Reset Values</button>
			<br></br>
			<br></br>
			Total Voltage: {this.state.result && this.state.result['totalVoltage']}
			<br></br>
			Total Amperage: {this.state.result && this.state.result['totalAmperage']}
			<br></br>
			Total Resistance: {this.state.result && this.state.result['totalResistance']}
			<br></br>
			Voltage Drop: {this.state.result && this.state.result['Voltage_drop']}
			<br></br>
			Total Power: {this.state.result && this.state.result['totalPower']}
			<br></br>
			Useful Power: {this.state.result && this.state.result['usefulPower']}
			<br></br>
			Efficiency: {this.state.result && this.state.result['efficiency']}
		</form>
	}
	renderacTab() {
		return (
			<>
			{this.createNumberInput("testing")}
			</>
		)
	}
	handleTab(w: string) {
		setTimeout( () => {
			if (w === "dc-tab") {
				this.setState({...this.state, activeTab: "dc-tab"})
			}
			if (w==="dc-tab-sp") {
				this.setState({...this.state, activeTab: 'dc-tab-sp'})
			}
			if (w === "ac-tab") {
				this.setState({ ...this.state, activeTab: "ac-tab" })
			}
			this.setState({...this.state,
				watts: "",
				volts: "",
				ohms: "",
				amps: "",
				power: "",
				wattsUnits: "none",
				voltsUnits: "none",
				ohmsUnits: "none",
				ampsUnits: "none",
				isSeries: true,
				result: null,
			})
		}, 100)
		
	}
	
	render() {
		return (
			<>
			<h1>Electrical Calculator</h1>
			<div id="tab-switching">
				<div id="dc-tab" className={this.state.activeTab === "dc-tab" ? "tab-item active" : "tab-item"} onClick={() => {this.handleTab("dc-tab")}}>
					Direct Current (DC)
				</div>
				<div id="ac-tab" className={this.state.activeTab === "dc-tab-sp" ? "tab-item active" : "tab-item"} onClick={() => {this.handleTab("dc-tab-sp") }}>
					DC Series/Parallel
				</div>
					<div id="ac-tab" className={this.state.activeTab === "ac-tab" ? "tab-item active" : "tab-item"} onClick={() => { this.handleTab("ac-tab") }}>
						Alternating Current (AC)
					</div>
			</div>
			{this.state.activeTab === "dc-tab" && this.renderdcTab()}
			{this.state.activeTab === "ac-tab" && this.renderacTab()}
			{this.state.activeTab === "dc-tab-sp" && this.renderdcspTab()}
			</>
		)
		// this.handleTab("dc-tab") 
		// return (
		// 	<div>
		// 		{this.state.activeTabHtml}
		// 	</div>
		// )
	}
}
export default ElectricalCalculator