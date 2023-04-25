import Hover3D from "../assets/js/hover3D";

const Decks  = (props) =>{
    const {decks } = props
    const createHoverEffect = () => {
        let hoverEffect = new Hover3D(".hover-effect");
      };
    
      setTimeout(createHoverEffect, 1000);

    return (
        <div className="m-auto col-11 d-flex align-items-center">
            {decks.map((deck, i) => {
                return (
                <div className= "hover-deck-stack m-auto hover-effect">
                    <div className = "hover-deck-stack-content">
                        <h1 className="deck-stack-title" >{deck.deckName}</h1>
                    </div>
                </div>)
            })}
        </div>
        )
}

export default Decks