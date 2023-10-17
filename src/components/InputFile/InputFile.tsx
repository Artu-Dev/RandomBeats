import { forwardRef } from 'react';
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import "./InputFile.css"

interface IInputFile {
	onInput(): void
}

export const InputFile = forwardRef<HTMLInputElement, IInputFile>(({onInput}, ref) => {
	return (
		<div className="inputFile-container">
			<label htmlFor="input-audio">
				<span><BsFileEarmarkMusicFill/></span>
				<p>Enviar Audio</p>
			</label>

			<input onInput={onInput} accept="audio/mpeg" type="file" id="input-audio" ref={ref} multiple={false}/>
		</div>
	)
})
