import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Decks = (props) => {
    const { filteredDecks, setFilteredDecks, cards, setShowEditDeck, setDeckId } = props
    const [filteredDecksLoaded, setFilteredDecksLoaded] = useState(false);
    const navigate = useNavigate();

    //horizontal scroll on the deck-list
    useEffect(() => {
        if (filteredDecksLoaded === true) {
            const deckList = document.querySelector(".deck-list");
            deckList.addEventListener('wheel', (event) => {
                event.preventDefault();
                deckList.scrollBy({
                    left: event.deltaY < 0 ? -10 : 10,
                });
            });
        }
    }, [filteredDecksLoaded]);

    useEffect(() => {
        let filteredCardsArr = []
        let nonstateFilteredDecks = [...filteredDecks]
        for (let i = 0; i < nonstateFilteredDecks.length; i++) {
            for (let j = 0; j < cards.length; j++) {
                if (cards[j].deck === nonstateFilteredDecks[i]._id) {
                    filteredCardsArr.push(cards[j])
                }
            }
            nonstateFilteredDecks[i].cards = filteredCardsArr
            filteredCardsArr = []
        }
        setFilteredDecks([...nonstateFilteredDecks])
        setFilteredDecksLoaded(true);
    }, [filteredDecksLoaded])

    const handleEditDeck = (deckId) => {
        setShowEditDeck(true)
        setDeckId(deckId)
    }

    return (filteredDecksLoaded &&
        <div className="d-flex align-items-center deck-list">
                {/* When I add a key to the below returns, the decks become duplicated. */}
                {filteredDecks.map((deck, i) => {
                    let appearancesSum = 0;
                    for (i = 0; i < deck.cards.length; i++) {
                        appearancesSum += parseInt(deck.cards[i].appearances)
                    }
                    if (appearancesSum === 0 || deck.cards.length === 0) {
                        return (
                            <div className="d-flex flex-column align-items-center m-auto">
                                <div className="deck-stack m-auto">
                                    <div>
                                        <h1>{deck.deckName}</h1>
                                        <h5>Not Yet Studied</h5>
                                    </div>
                                </div>
                                <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <Link>
                                        <button className="btn btn-primary shadow-sm">Edit</button>
                                    </Link>
                                    <Link to="/addcards" state={{deck}}>
                                        <button className="btn btn-primary shadow-sm" >Add Cards</button>
                                    </Link>
                                    <Link>
                                        <button className="btn btn-danger shadow-sm" >Delete</button>
                                    </Link>
                                </div>
                            </div>)
                    }
                    else {
                        let successesSum = 0;
                        for (i = 0; i < deck.cards.length; i++) {
                            successesSum += parseInt(deck.cards[i].successes)
                        }
                        let successRate = Math.floor((successesSum / appearancesSum) * 100)
                        return (
                            <div className="d-flex flex-column align-items-center m-auto">
                                <div className="deck-stack m-auto">
                                    <div>
                                        <h1>{deck.deckName}</h1>
                                        <h5>{`Success Rate: ${successRate}%`}</h5>
                                    </div>
                                </div>
                                <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <Link>
                                        <button className="btn btn-primary shadow-sm" onClick={() => handleEditDeck(deck._id)}>Edit</button>
                                    </Link>
                                    <Link to="/addcards" state={{deck}}>
                                        <button className="btn btn-primary shadow-sm">Add Cards</button>
                                    </Link>
                                    <Link>
                                        <button className="btn btn-danger shadow-sm" >Delete</button>
                                    </Link>
                                </div>
                            </div>)
                    }
                })}
            </div>
        
    )
}

export default Decks