// import SOM from "./som.mp3";
import { FunctionComponent, useEffect,useRef, useState } from "react";
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

	const [maxTimeUser, setMaxTimeUser] = useState<number>(30);
	const [minTimeUser, setMinTimeUser] = useState<number>(5);
	const maxTimeRef = useRef<HTMLInputElement>(null);
	const minTimeRef = useRef<HTMLInputElement>(null);

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

		return Math.floor(Math.random() * (maxTime - minTime +1) + minTime);
	}

	useEffect(() => {
		setAudioElement(new Audio(audio))
	}, [])

	useEffect(() => {
		if(isRunning) {
			handlePlayAudio();
		}
	}, [isRunning])  



	function handleRangeChange(isMin: boolean) {
		if(!maxTimeRef.current || !minTimeRef.current) return;

		const maxtime = Number(maxTimeRef.current.value);
		const mintime = Number(minTimeRef.current.value);
		setMinTimeUser(mintime)
		setMaxTimeUser(maxtime)

		if(mintime > maxtime) {
			if(isMin) {
				maxTimeRef.current.value = minTimeRef.current.value
			} 
			else {
				minTimeRef.current.value = maxTimeRef.current.value
			}
		}
	}

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
					cbValue={() => handleRangeChange(true)}
					disabled={isRunning}
					rangeRef={minTimeRef}
					/>
				<RangeInput 
					text="Intervalo Maximo (minutos)"
					id="timeMax"
					defaultValue="30"
					cbValue={() => handleRangeChange(false)}
					disabled={isRunning}
					rangeRef={maxTimeRef}
				/>
			</div>

		</div>
	)
}

export default AudioElement