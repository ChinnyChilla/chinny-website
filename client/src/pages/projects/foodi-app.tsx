import React, {useRef} from 'react';

import "./foodi-app.css";

interface State {
	currentFoodNutrients: NutrientFacts | null,
	tookImage: boolean,
	imageData: string | null,

}
interface NutrientFacts {
	food_name: string,
	serving_qty: number,
	serving_unit: string,
	calories: number,
	total_fat: number,
	cholestrol: number,
	protein: number,
	sodium: number,
	total_carbohydrate: number,
	sugars: number,
}

const CameraPreview = ({ onTakePhoto }: { onTakePhoto: (dataUri: string) => void }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	navigator.mediaDevices
		.getUserMedia({ video: true })
		.then((stream) => {
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		});

	const handleTakePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			const canvas = canvasRef.current;
			const video =videoRef.current;
			if (canvas && video) {
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
				onTakePhoto(canvasRef.current.toDataURL('image/png'));
			}
		}
	};

	return (
		<div>
			<video ref={videoRef} autoPlay style={{maxWidth: '100%', maxHeight: '100%'}}/>
			<button onClick={handleTakePhoto}>Take photo</button>
			<canvas ref={canvasRef} style={{ display: 'none' }} />
		</div>
	);

}

function NutrientsTable(props: {nutrients: NutrientFacts}) {
	return(
		<div>
				<h2>Item: {props.nutrients.food_name}</h2>
				<h3>Nutrition Facts</h3>
				<p>Serving Size: {props.nutrients.serving_qty}  {props.nutrients.serving_unit}</p>
				<p>Calories: {props.nutrients.calories}</p>
				<p>Total Fat: {props.nutrients.total_fat} g</p>
				<p>Cholesterol: {props.nutrients.cholestrol} mg</p>
				<p>Protein: {props.nutrients.protein} g</p>
				<p>Sodium: {props.nutrients.sodium} mg</p>
				<p>Total Carbohydrates: {props.nutrients.total_carbohydrate} g</p>
				<p>Sugars: {props.nutrients.sugars} g</p>
		</div>
	)
}
class FoodiApp extends React.Component {
	
	constructor(props: any) {
		super(props);
		this.getScreenshot = this.getScreenshot.bind(this);
	}
	public state: State = {
		currentFoodNutrients: null,
		tookImage: false,
		imageData: null,
	}
	getScreenshot() {
		return (
			<div>
				<img src={this.state.imageData!} alt="screenshot" style={{ maxWidth: '100%', maxHeight: '100%' }} />
				<button onClick={() => this.setState({ ...this.state, tookImage: false })}>Retake</button>
			</div>
		)
	}

	requestFoodNutrients(imageData: string) {
		fetch("/api/foodi/getNutrients", {
			method: "post",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: imageData }),
		}).then(res => {
			console.log("in response");
			res.json().then((data) => {
				if (!data) return;
				console.log(data);
				var firstFood = data.foods[0];
				console.log("break");
				console.log(firstFood);
				var nutrients: NutrientFacts = {
					food_name: firstFood.food_name,
					serving_qty: firstFood.serving_qty,
					serving_unit: firstFood.serving_unit,
					calories: firstFood.nf_calories,
					total_fat: firstFood.nf_total_fat,
					cholestrol: firstFood.nf_cholestrol,
					protein: firstFood.nf_protein,
					sodium: firstFood.nf_sodium,
					total_carbohydrate: firstFood.nf_total_carbohydrate,
					sugars: firstFood.nf_sugars,
				}
				this.setState({ ...this.state, currentFoodNutrients: nutrients })
			})
		})
	}

	render() {
		return (
			<div>
				<h2>A project created by Wilson Huang, Aryan Jain, and Michael Zheng</h2>
				<header className="App-header">
					<img id="logo-top" src={process.env.PUBLIC_URL + '/foodi-logo.png'} className="App-logo" alt="logo" />
				</header>
				<div id="camera-div">
					{
						this.state.tookImage ? (
							this.getScreenshot()
						) : (
							<CameraPreview onTakePhoto={(dataUri) => {
								this.setState({ ...this.state, tookImage: true, imageData: dataUri});
								this.requestFoodNutrients(dataUri);
							}} />
						)
					}
				</div>
				<div id="nutrient-facts-div">
					<h3>Nutrient Facts:</h3>
					{this.state.currentFoodNutrients && <NutrientsTable nutrients={this.state.currentFoodNutrients} />}

				</div>
			</div>
		)
	}
}

export default FoodiApp;