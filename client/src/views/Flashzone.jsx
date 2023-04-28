import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import sound4 from "../assets/sounds/flipcard.mp3"
import sound2 from "../assets/sounds/save-button2.mp3"

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
    const flipCardSound = new Audio(sound4)
    const clickSound = new Audio(sound2)

    const handleCorrect = (cardId) => {
        clickSound.play()
        let apps = appearances + 1
        let succ = successes + 1
        axios.put("http://localhost:8000/api/cards/" + cardId, {
            appearances: apps,
            successes: succ
        })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
        let updateDeck = [...randomDeck ]
        updateDeck[currentIdx].appearances = updateDeck[currentIdx].appearances + 1;
        updateDeck[currentIdx].successes = updateDeck[currentIdx].successes + 1;
        setRandomDeck([ ...updateDeck ])
        let newIdx = currentIdx
        if (currentIdx == randomDeck.length - 1) {
            setCurrentIdx(0);
            newIdx=0;
        }
        else {
            setCurrentIdx((prev) => prev + 1);
            newIdx++;
        }
        setAppearances(randomDeck[newIdx].appearances);
        setSuccesses(randomDeck[newIdx].successes);
        setCardFront(randomDeck[newIdx].cardFront);
        setCardBack(randomDeck[newIdx].cardBack);
        setCardId(randomDeck[newIdx]._id)
        document.getElementById("hint").style.display="none";
        document.querySelector(".flip-card").classList.toggle("is-flipped");
        document.querySelector(".flip-card__face--back").style.display = "none"
        document.getElementById("gotIt").classList.add("disabled");
        document.getElementById("missedIt").classList.add("disabled");

    }

    const handleIncorrect = (cardId) => {
        clickSound.play()
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
        let newIdx = currentIdx
        if (currentIdx == randomDeck.length - 1) {
            setCurrentIdx(0);
            newIdx=0;
        }
        else {
            setCurrentIdx((prev) => prev + 1);
            newIdx++;
        }
        setAppearances(randomDeck[newIdx].appearances);
        setSuccesses(randomDeck[newIdx].successes);
        setCardFront(randomDeck[newIdx].cardFront);
        setCardBack(randomDeck[newIdx].cardBack);
        setCardId(randomDeck[newIdx]._id)
        document.getElementById("hint").style.display="none";
        document.querySelector(".flip-card").classList.toggle("is-flipped");
        document.querySelector(".flip-card__face--back").style.display = "none"
        document.getElementById("gotIt").classList.add("disabled");
        document.getElementById("missedIt").classList.add("disabled");

    }

    const handleEndSession = () => {
        navigate('/study')
    }

    const handleHint = () => {
        document.getElementById("hint").style.display="block";
    }

    const flipCard = (e) => {
        flipCardSound.play()
        e.target.classList.toggle("is-flipped");
        document.querySelector(".flip-card__face--back").style.display = "block"
        document.getElementById("gotIt").classList.remove("disabled");
        document.getElementById("missedIt").classList.remove("disabled");
    };

    useEffect(() => {
        let randomDeck = shuffle(studyDeck)
        // console.log(randomDeck);
        document.querySelector(".navbar-body").style.display = "none"
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
        let currentIndex = array.length - 1;
        let randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        console.log(array);
        return array;
    }

    return (
        <div>
            <div className="top">
                <div className="d-flex align-items-center">
                    <div className="d-flex align-items-center m-auto gap-3 mt-3 deckname-and-button">
                        <h1 className="text-light">{deckName}</h1>
                        <button className="btn btn-delete my-shadow m-auto text-light" onClick = {() => handleEndSession()}>End Session</button>
                    </div>
                </div>
            </div>
            <div className="d-flex col-6 justify-content-around m-auto study-container">
                <div className="left-side d-flex flex-column align-items-center">
                    <div className="scene scene--flip-card">
                        <div className="flip-card" onClick={(e) => flipCard(e)} id="flipped-card">
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
                    <button className="btn btn-create my-shadow mt-3 text-light hint-button" onClick={() => handleHint()}>Hint</button>
                </div>
                <div className="right-side">
                    <div className="buttons d-flex flex-column gap-3">
                        <button id="gotIt" className="btn btn-create my-shadow disabled text-light" onClick={() => handleCorrect(cardId)}>I got it!</button>
                        <button id="missedIt" className="btn btn-delete my-shadow disabled text-light" onClick={() => handleIncorrect(cardId)}>I missed it :(</button>
                    </div>
                </div>
            </div>
            <div className="vignette" ></div>
            <div className="flashzone-background" ></div>
        </div>
    )
}

export default Flashzone