import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Flashzone = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const studyDeck = location.state.studyDeck;
    const deckName = location.state.deckName
    const [appearances, setAppearances] = useState();
    const [successes, setSuccesses] = useState();
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const [cardId, setCardId] = useState("");
    const [randomDeck, setRandomDeck] = useState({});
    const [currentIdx, setCurrentIdx] = useState(0);
    const [loaded, setLoaded] = useState(false)

    const handleCorrect = (cardId) => {
        let apps = appearances + 1
        let succ = successes + 1
        axios.put("http://localhost:8000/api/cards/" + cardId, {
            appearances: apps,
            successes: succ
        })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        let updateDeck = [...randomDeck ]
        console.log("Logging 'updateDeck'")
        console.log(updateDeck)
        updateDeck[currentIdx].appearances = updateDeck[currentIdx].appearances + 1;
        updateDeck[currentIdx].successes = updateDeck[currentIdx].successes + 1;
        setRandomDeck([ ...updateDeck ])
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
        document.getElementById("hint").style.display="none";
    }

    const handleIncorrect = (cardId) => {
        let apps = appearances + 1
        axios.put("http://localhost:8000/api/cards/" + cardId, {
            appearances: apps
        })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        let updateDeck = [...randomDeck ]
        console.log("Logging 'updateDeck'")
        console.log(updateDeck)
        updateDeck[currentIdx].appearances = updateDeck[currentIdx].appearances + 1;
        setRandomDeck([ ...updateDeck ])
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
        setCardId(randomDeck[currentIdx]._id);
        document.getElementById("hint").style.display="none";
    }

    const handleEndSession = () => {
        navigate('/study')
    }

    const handleHint = () => {
        document.getElementById("hint").style.display="block";
    }

    const flipCard = (e) => {
        e.target.classList.toggle("is-flipped");
    };

    useEffect(() => {
        let randomDeck = shuffle(studyDeck)
        // console.log(randomDeck);
        setRandomDeck(randomDeck)
        if (loaded == false) {
            document.getElementById("hint").style.display="none";
            console.log(randomDeck[currentIdx].appearances)
            setAppearances(randomDeck[currentIdx].appearances);
            setSuccesses(randomDeck[currentIdx].successes);
            setCardFront(randomDeck[currentIdx].cardFront);
            setCardBack(randomDeck[currentIdx].cardBack);
            setCardId(randomDeck[currentIdx]._id)
            setLoaded(true);
        }
    }, [])


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
                <button className="btn btn-delete my-shadow" onClick = {() => handleEndSession()}>End Session</button>
            </div>
            <div className="left-side">
                <div className="scene scene--flip-card">
                    <div className="flip-card" onClick={(e) => flipCard(e)}>
                        <div className="flip-card__face flip-card__face--front">
                            <h1>{cardFront}</h1>
                            <h6 id="hint">{cardBack.split(' ').length > 1 ? `The answer is ${cardBack.split(' ').length} words long.` :  `The answer is ${cardBack.length} characters long.`}</h6>
                        </div>
                        <div className="flip-card__face flip-card__face--back">
                            <div className="smaller-card-front"><h4>{cardFront}</h4></div>
                            <h1>{cardBack}</h1>
                        </div>
                    </div>
                </div>
                <button className="btn btn-create my-shadow" onClick={() => handleHint()}>Hint</button>
            </div>
            <div className="right-side">
                <div className="buttons">
                    <button className="btn btn-create my-shadow" onClick={() => handleCorrect(cardId)}>I got it!</button>
                    <button className="btn btn-delete my-shadow" onClick={() => handleIncorrect(cardId)}>I missed it :(</button>
                </div>
            </div>
        </div>
    )
}

export default Flashzone