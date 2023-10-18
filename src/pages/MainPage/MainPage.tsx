import AudioElement from "../../components/AudioElement/AudioElement"
import { useRef, useState } from "react"
import "./MainPage.css"
import { InputFile } from "../../components/InputFile/InputFile"

interface IAudiosList {
	audioURL: string
	audioName: string
}

const MainPage = () => {
	const filesRef = useRef<HTMLInputElement>(null);

	const [audiosList, setAudiosList] = useState<IAudiosList[]>([])

	function handleInput() {
		const element = filesRef.current;
		if(!element?.files?.length) return
		
		const audioObj = URL.createObjectURL(element?.files[0])
		const name = element.files[0].name

		setAudiosList(prev => [...prev, { audioName: name, audioURL: audioObj }]);

		element.value = ""
	}
	
	function removeAudioFromList(index: number) {
		const itemSelected = audiosList[index];
		setAudiosList(prev => prev.filter((_, i) => i !== index));

		URL.revokeObjectURL(itemSelected.audioURL);
	}

	return (
		<main className="main-container">
			<InputFile 
				onInput={handleInput}
				ref={filesRef}
			/>

			<div className="audios-container">
				{!!audiosList.length ?
					audiosList.map((item, i) => (
						<AudioElement 
							key={i}
							index={i}
							audioName={item.audioName} 
							audio={item.audioURL}
							onRemove={removeAudioFromList}
						/>
					))
				:
					<h1 className="no-audio">Nenhum áudio adicionado ainda '-'</h1>
				}
			</div>
		
		</main>
	)
}

export default MainPage