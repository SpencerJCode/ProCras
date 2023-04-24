const Decks  = (props) =>{
    const {decks } = props

    return (
        <div className="m-auto col-11 d-flex align-items-center">
            {decks.map((deck, i) => {
                return (
                <div className= "hover-deck-stack m-auto">
                    <div className = "hover-deck-stack-content">
                        <h1>{deck.deckName}</h1>
                    </div>
                </div>)
            })}
        </div>
        )
}

export default Decks