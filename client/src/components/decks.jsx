import Hover3D from "../assets/js/hover3D";
import { Link } from "react-router-dom";

const Decks  = (props) =>{
    const {decks } = props
    const createHoverEffect = () => {
        let hoverEffect = new Hover3D(".hover-effect");
      };
    
      setTimeout(createHoverEffect, 1000);

    return (
        <div className="col-11 d-flex align-items-center mt-3 m-auto gap-5">
            {decks.map((deck, i) => {
                let appearancesSum = 0;
                for (i = 0; i< deck.cards.length; i++) {
                    console.log("appearances:" + deck.cards[i]);
                    appearancesSum += parseInt(deck.cards[i].appearances) 
                }
                if (appearancesSum === 0 || deck.cards.length === 0) {
                    return (
                        <div className="d-flex flex-column align-items-center m-auto">
                            <div className= "hover-deck-stack m-auto hover-effect">
                                <div className = "hover-deck-stack-content">
                                    <div className="deck-stack-title">
                                        <h1>{deck.deckName}</h1>
                                        <h5>Not Yet Studied</h5>
                                    </div>
                                </div>
                            </div>
                            <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <Link>
                                    <button className="btn btn-primary" >Edit</button>
                                    </Link>
                                    <Link>
                                    <button className="btn btn-primary" >Add Cards</button>
                                    </Link>
                                    <Link>
                                    <button className="btn btn-primary" >Delete</button>
                                    </Link>
                                </div>
                        </div>)
                }
                else {
                    let successesSum = 0;
                    for (i = 0; i < deck.cards.length; i++) {
                        successesSum += parseInt(deck.cards[i].successes)
                    }  
                    let successRate = Math.floor((successesSum / appearancesSum)*100)
                    return (
                        <div className="d-flex flex-column align-items-center m-auto">
                            <div className= "hover-deck-stack m-auto hover-effect">
                                <div className = "hover-deck-stack-content">
                                    <div className="deck-stack-title">
                                        <h1>{deck.deckName}</h1>
                                        <h5>{`Success Rate: ${successRate}`}</h5>
                                    </div>
                                </div>
                            </div>
                            <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <Link>
                                    <button className="btn btn-primary" >Edit</button>
                                    </Link>
                                    <Link>
                                    <button className="btn btn-primary" >Add Cards</button>
                                    </Link>
                                    <Link>
                                    <button className="btn btn-primary" >Delete</button>
                                    </Link>
                                </div>
                        </div>)
                }

            })}
        </div>
        )
}

export default Decks