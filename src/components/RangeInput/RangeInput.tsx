import { FunctionComponent,useRef, useState } from 'react'
import "./RangeInput.css"

interface IRange {
	text: string
	id: string
	defaultValue: string
	cbValue(output: number): void
	disabled: boolean
}

export const RangeInput:FunctionComponent<IRange> = ({text, id, defaultValue, cbValue, disabled}) => {
	const rangeRef = useRef<HTMLInputElement>(null);

	const [output, setOutput] = useState<string>(defaultValue);

	function handleChangeInput() {
		if(rangeRef.current) {
			setOutput(rangeRef.current.value)
			cbValue(Number(output))
		}
	}

	return (
		<span className="rangeinput-container">
			<label htmlFor={id}>
					{text}
			</label>
			<span>
				<input 
					onChange={handleChangeInput}
					ref={rangeRef}
					type="range"
					id={id}
					min={1}
					max={120}
					defaultValue={defaultValue}
					disabled={disabled}
				/>
				<output>{output}</output>
			</span>
		</span>
	)
}
