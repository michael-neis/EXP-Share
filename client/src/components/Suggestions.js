import { useState, useEffect } from 'react'
import SuggestionCard from './SuggestionCard'


function Suggestions(){

    const [games, setGames] = useState([])

    useEffect(() => {
        fetch('api/suggestions').then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setGames(data)
                })
            }else{
                res.json()
                .then(errors => {
                    console.log(errors)
                })
            }
        })
    }, [])

    const displaySuggestions = games.map((game) => <SuggestionCard key={game.id} game={game} sender={game.sender}/>)

    return(
        <div className="suggestion-container">
            {games.length > 0 ? displaySuggestions : <h3>No suggestions yet!</h3>}
        </div>
    )
}

export default Suggestions