import { FunctionComponent, RefObject } from 'react'
import "./RangeInput.css"

interface IRange {
	text: string
	id: string
	defaultValue: string
	cbValue(): void
	disabled: boolean
	rangeRef: RefObject<HTMLInputElement>
}

export const RangeInput: FunctionComponent<IRange> = ({text, id, defaultValue, cbValue, disabled, rangeRef}) => {

	return (
		<span className="rangeinput-container">
			<label htmlFor={id}>
					{text}
			</label>
			<span>
				<input 
					onChange={cbValue}
					ref={rangeRef}
					type="range"
					id={id}
					min={1}
					max={120}
					defaultValue={defaultValue}
					disabled={disabled}
				/>
				<output>{rangeRef.current?.value || "0"}</output>
			</span>
		</span>
	)
}
