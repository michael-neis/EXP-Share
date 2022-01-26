import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import SuggestionCard from './SuggestionCard'


function Suggestions(){

    const [games, setGames] = useState([])

    let history = useNavigate()


    useEffect(() => {
        fetch('/api/suggestions').then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    console.log(data)
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


    const handleGameClick = (game) => {
        localStorage.setItem('gameId', game.id)
        history('/game')
    }

    const displaySuggestions = games.map((game) => <SuggestionCard key={game.id} game={game} sender={game.sender}/>)

    return(
        <div className="suggestion-container">
            {displaySuggestions}
        </div>
    )
}

export default Suggestions