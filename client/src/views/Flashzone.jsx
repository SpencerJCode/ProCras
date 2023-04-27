import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Flashzone = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const studyDeck = location.state.studyDeck;
    const deckName = location.state.deckName
    // const [currentCard, setCurrentCard] = useState({});
    const [appearances, setAppearances] = useState();
    const [successes, setSuccesses] = useState();
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const [cardId, setCardId] = useState("");
    const [randomDeck, setRandomDeck] = useState({});
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loaded, setLoaded] = useState(false)

    const handleCorrect = (cardId) => {
        setAppearances((prev) => prev + 1);
        setSuccesses((prev) => prev + 1);
        axios.put("http://localhost:8000/api/cards/" + cardId, {
            appearances,
            successes
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        let updateDeck = { ...randomDeck }
        updateDeck[currentIdx].appearances++;
        updateDeck[currentIdx].successes++;
        // console.log(updateDeck[currentIdx]);
        // console.log(updateDeck[currentIdx].successes);
        setRandomDeck({ ...updateDeck })
        if (currentIdx == randomDeck.length - 1) {
            setCurrentIdx(0);
        }
        else {
            setCurrentIdx((prev) => prev + 1);
        }
        setAppearances(randomDeck[currentIdx].appearances);
        setSuccesses(randomDeck[currentIdx].successes);
        setCardFront(randomDeck[currentIdx].cardFront);
        setCardBack(randomDeck[currentIdx].cardBack);
        setCardId(randomDeck[currentIdx]._id)
    }

    // const handleIncorrect = (cardId) => {
    //     axios.put("http://localhost:8000/api/cards/" + cardId, {
    //         appearances: appearances++,
    //     })
    //     let updateDeck = {...randomDeck}
    //     updateDeck[currentIdx].appearances++;
    //     setRandomDeck({...updateDeck})
    //     if (currentIdx == randomDeck.length-1) {
    //         setCurrentIdx(0);
    //     }
    //     else {
    //         setCurrentIdx(currentIdx++);
    //     }
    //     setCurrentCard({
    //         cardFront: randomDeck[currentIdx].cardFront,
    //         cardBack: randomDeck[currentIdx].cardBack,
    //         _id: randomDeck[currentIdx]._id,
    //         appearances: randomDeck[currentIdx].appearances,
    //         successes: randomDeck[currentIdx].successes
    //     })
    // }

    const flipCard = (e) => {
        e.target.classList.toggle("is-flipped");
    };

    useEffect(() => {
        let randomDeck = shuffle(studyDeck)
        // console.log(randomDeck);
        setRandomDeck([...randomDeck])
        let cardVar1 = { cardFront: randomDeck[currentIdx].cardFront }
        if (loaded == false) {
            setAppearances(randomDeck[currentIdx].appearances);
            setSuccesses(randomDeck[currentIdx].successes);
            setCardFront(randomDeck[currentIdx].cardFront);
            setCardBack(randomDeck[currentIdx].cardBack);
            setCardId(randomDeck[currentIdx]._id)
            setLoaded(true);
        }
    }, [])

    // console.log(currentCard.appearances, currentCard.successes);


    const shuffle = (array) => {
        setCurrentIdx(array.length - 1);
        let randomIndex;
        // While there remain elements to shuffle.
        while (currentIdx != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIdx);
            currentIdx--;
            // And swap it with the current element.
            [array[currentIdx], array[randomIndex]] = [
                array[randomIndex], array[currentIdx]];
        }
        return array;
    }

    return (
        <div className="flashzone-background">
            <div className="top">
                {deckName}
                <button className="btn btn-delete my-shadow" >End Session</button>
            </div>
            <div className="left-side">
                <div className="scene scene--flip-card">
                    <div className="flip-card" onClick={(e) => flipCard(e)}>
                        <div className="flip-card__face flip-card__face--front">
                            <h1>{cardFront}</h1>
                        </div>
                        <div className="flip-card__face flip-card__face--back">
                            <div className="smaller-card-front"><h4>{cardFront}</h4></div>
                            <h1>{cardBack}</h1>
                        </div>
                    </div>
                </div>
                <button className="btn btn-create my-shadow">Hint</button>
            </div>
            <div className="right-side">
                <div className="buttons">
                    <button className="btn btn-create my-shadow" onClick={() => handleCorrect(cardId)}>I got it!</button>
                    {/* <button className="btn btn-delete my-shadow" onClick={() => handleIncorrect(_id)}>I missed it :(!</button> */}
                </div>
            </div>
        </div>
    )
}

export default Flashzone