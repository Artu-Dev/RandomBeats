import { BsGithub } from "react-icons/bs";
import ModalAbout from "../ModalAbout/ModalAbout";
import { useState } from "react";
import "./Navbar.css"

const Navbar = () => {
	const [isModalVisible, setIsModalVisible] = useState<Boolean>(false);

	return (
		<nav className="navbar-container">
			<h1 className="navbar-title">Random<span>Beats</span></h1>
			<ul className="navbar-list">
				<li onClick={() => setIsModalVisible(true)}>Sobre</li>
				<li><a href="https://github.com/Artu-Dev/RandomBeats" target="_blank"><BsGithub/></a></li>
			</ul>
			{isModalVisible &&
				<ModalAbout
					onClick={() => setIsModalVisible(false)}
				/>
			}
		</nav>
	)
}

export default Navbar