// import SOM from "./som.mp3";
import { FunctionComponent, useEffect, useState } from "react";
import ControlBtn from "../ControlBtn/ControlBtn";
import {BsTrash2Fill, BsFillDiscFill, BsFillPlayFill, BsFillPauseFill} from "react-icons/bs"

import "./AudioElement.css"
import { RangeInput } from "../RangeInput/RangeInput";

interface ITesteProps {
	minTime?: number,
	maxTime?: number,
	audioName: string,
	audio: string,
	index: number
	onRemove(index: number): void
}

const AudioElement: FunctionComponent<ITesteProps> = ({audioName, audio, onRemove, index}) => {
	const [maxTimeUser, setMaxTimerUser] = useState<number>(30);
	const [minTimeUser, setMinTimerUser] = useState<number>(5);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [audioTimeout, setAudioTimeout] = useState<ReturnType<typeof setTimeout>>();
	
	const [audioElement, setAudioElement] = useState<HTMLAudioElement>();

	function handleStart() {
		setIsRunning(true);
	}

	function handleStop() {
		setIsRunning(false);
		pauseAudio()
		if(audioTimeout) {
			clearTimeout(audioTimeout)
		}
	}
	
	function handlePlayAudio() {
		if(!isRunning) return
		playAudio();
		setAudioTimeout(setTimeout(handlePlayAudio, getRandomTime()))
	}
	
	function playAudio() {
		if(audioElement) {
			audioElement.play();
			audioElement.currentTime = 0;
		}
	}

	function pauseAudio() {
		audioElement?.pause();
	}

	
	function getRandomTime() {
		const minTime = minTimeUser * 60 * 1000;
		const maxTime = maxTimeUser * 60 * 1000;

		const result =  Math.floor(Math.random() * (maxTime - minTime +1) + minTime);

		console.log(result/60000)

		return result
	}

	useEffect(() => {
		setAudioElement(new Audio(audio))
	}, [])

	useEffect(() => {
		if(isRunning) {
			handlePlayAudio();
		}

	}, [isRunning])

	return (
		<div className="audioElement-container">
			<span className="deleteAudio" onClick={() => onRemove(index)}>
				<BsTrash2Fill/>
			</span>

			<div className="audioElement-main">	
				<div className={`audioInfo ${isRunning ? "running" : ""}`}>
					<span><BsFillDiscFill/></span>
					<h1>{audioName}</h1>
				</div>
	
				<div className="audio-controls">
					<ControlBtn 
						text={"Começar"}
						Icon={BsFillPlayFill}
						onClick={handleStart}
						disabled={isRunning}
						/>
					<ControlBtn 
						text={"Parar"}
						Icon={BsFillPauseFill}
						onClick={handleStop}
						disabled={!isRunning}
					/>
				</div>
			</div>

			<div className="audioElement-configs" style={{display: !isRunning ? "block" : "none" }}>
				<RangeInput 
					text="Intervalo Minimo (minutos)"
					id="timeMin"
					defaultValue="5"
					cbValue={(value) => setMinTimerUser(value)}
					disabled={isRunning}
					/>
				<RangeInput 
					text="Intervalo Maximo (minutos)"
					id="timeMax"
					defaultValue="30"
					cbValue={(value) => setMaxTimerUser(value)}
					disabled={isRunning}
				/>
			</div>

		</div>
	)
}

export default AudioElement