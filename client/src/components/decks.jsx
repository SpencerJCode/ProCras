import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Decks = (props) => {
    const { filteredDecks, setFilteredDecks, cards, setShowEditDeck, setDeckId, stackId, setStackId, filteredDecksLoaded, setFilteredDecksLoaded, setShowDeleteDeckWarning, setDeck } = props
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
        setFilteredDecks([...nonstateFilteredDecks]);
        setFilteredDecksLoaded(true);
        
}, [filteredDecksLoaded])

    const handleEditDeck = (deckId, stackId) => {
        setShowEditDeck(true)
        setDeckId(deckId)
        setStackId(stackId)
    }

    const showDelete = (id) => {
        setShowDeleteDeckWarning(true)
        setDeckId(id)
    }

    const navigateToAddCards = (deck) => {
        // setDeck(deck)
        navigate('/addcards', {state:{deck: deck}})
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
                                        <h2>{deck.deckName}</h2>
                                        <h5>Not Yet Studied</h5>
                                    </div>
                                </div>
                                <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <button className="btn btn-create text-light my-shadow" onClick={() => handleEditDeck(deck._id, deck.stack)}>Rename</button>
                                    <button className="btn btn-create text-light my-shadow" onClick={() => navigateToAddCards(deck)} >+ Add Cards</button>
                                    <button className="btn btn-delete text-light my-shadow" onClick={() => showDelete(deck._id)}>Delete</button>
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
                                        <h2>{deck.deckName}</h2>
                                        <h5>{`Success Rate: ${successRate}%`}</h5>
                                    </div>
                                </div>
                                <div id={`stack-deck-buttons-${deck._id}`} className="stack-deck-buttons d-flex gap-3 mt-3">
                                    <button className="btn btn-create text-light my-shadow" onClick={() => handleEditDeck(deck._id, deck.stack)}>Rename</button>
                                    <button className="btn btn-create text-light my-shadow" onClick={() => navigateToAddCards(deck)}>+ Add Cards</button>
                                    <button className="btn btn-delete text-light my-shadow" onClick={() => showDelete(deck._id)}>Delete</button>
                                </div>
                            </div>)
                    }
                })}
            </div>
        
    )
}

export default Decks