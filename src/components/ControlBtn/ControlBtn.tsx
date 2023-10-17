import { FunctionComponent } from "react"
import { IconType } from "react-icons"
import "./ControlBtn.css"

interface IButton {
	onClick(): void 
	disabled?: boolean
	text: string
	Icon?: IconType
}

const ControlBtn: FunctionComponent<IButton> = ({onClick, disabled, text, Icon}) => {
	return (
		<button className="controlBtn" onClick={onClick} disabled={disabled}>
			<span className="controlBtn-span">
				{text}
				{Icon &&
					<span className="controlBtn-icon">
						<Icon/>
					</span>
				}
			</span>
		</button>
	)
}

export default ControlBtn