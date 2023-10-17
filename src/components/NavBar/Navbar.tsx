import { BsGithub } from "react-icons/bs";
import "./Navbar.css"

const Navbar = () => {
	return (
		<nav className="navbar-container">
			<h1 className="navbar-title">Random<span>Beats</span></h1>
			<ul className="navbar-list">
				<li>Sobre</li>
				<li><a href="#" target="_blank"><BsGithub/></a></li>
			</ul>
		</nav>
	)
}

export default Navbar