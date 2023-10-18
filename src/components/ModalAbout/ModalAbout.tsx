import { FC } from "react";
import "./ModalAbout.css"

interface IModal {
	onClick(): void
}

const ModalAbout: FC<IModal> = ({onClick}) => {
  return (
    <div className="modal">
      <div className="modal-content">

        <h2>Bem-vindo ao Random<span>Beats</span>!</h2>
        <p>Se você curte ouvir sons aleatóriamente enquanto você faz alguma coisa, este é o lugar certo para você. O RandomBeats&copy; foi inspirado nos famosos vídeos de <em>"1 hora de silêncio ocasionalmente interrompido por memes aleatórios"</em>.</p>
        <div className="modal-list">
        	<p>Como funciona:</p>
	        <ul>
	          <li>Escolha suas músicas ou sons favoritos para tocar aleatoriamente.</li>
	          <li>Defina o intervalo de tempo entre cada reprodução.</li>
	          <li>Clique em "Iniciar" e deixe o RandomBeats criar a trilha sonora perfeita para o seu momento.</li>
	        </ul>
        </div>
        <p>É simples, facil e, acima de tudo, aleatório! '-'</p>

				<button className="modal-button" onClick={onClick}>Entendido!</button>
      </div>
    </div>
  );
}

export default ModalAbout;
