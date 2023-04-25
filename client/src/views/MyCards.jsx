import React, {useState, useEffect } from "react"
import axios from "axios"
import Decks from "../components/decks"
import Stacks from "../components/stacks"

const MyCards = (props) => {
  const [stacks, setStacks] = useState([]);
  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);
  const [stacksLoaded, setStacksLoaded ] = useState(false);
  const [decksLoaded, setDecksLoaded ] = useState(false);
  

  useEffect(()=>{
    axios.get('http://localhost:8000/api/stacks')
        .then(res=>{
            setStacks(res.data);
            setStacksLoaded(true)
        })
        .catch(err => console.error(err));
},[stacksLoaded]);

// useEffect(()=>{
//   axios.get('http://localhost:8000/api/decks')
//       .then(res=>{
//           setDecks(res.data);
//           setDecksLoaded(true)
//       })
//       .catch(err => console.error(err));
// },[decksLoaded]);
  
  const highlightedStack = (id) => {
    axios.get('http://localhost:8000/api/decks/stack/' +id)
      .then(res=>{
        console.log(res.data)
          setDecks(res.data);
          setDecksLoaded(true)
      })
      .catch(err => console.error(err))
  }

    return (
      <div>
         <div className = "stackContainer">
            Stack Row (Make new stack button)
            Clicking on a Stack enables edit/delete
            {/* study button? */}
            {stacksLoaded && <Stacks stacks = {stacks} highlightedStack = {highlightedStack}/>}
          </div>
          <div className = "deckContainer">
            Deck Row (Make new deck button)
            Clicking on a deck enables edit/delete/add card
            {/* study button? */}
            {decksLoaded && <Decks decks = {decks}/>}
          </div>
      </div>
    );
  };
  
  export default MyCards;
  