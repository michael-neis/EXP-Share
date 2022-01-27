import GameCard from "./GameCard"
import { useState, useEffect } from "react"

function Collection(){

    const [games, setGames] = useState([])
    const [collectionName, setCollectionName] = useState('')

    const collectionId = localStorage.getItem('collectionId')

    useEffect(() => {

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                collection_id: collectionId
            })
        }

        fetch('api/collection', configObj).then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setGames(data[0].games)
                    setCollectionName(data[0].name)
                })
            }else{
                res.json()
                .then(errors => {
                    alert(errors.error)
                })
            }
        })
    }, [])

    let displayGames

    if(games.length > 0){
        displayGames = games.map(game => <GameCard key={game.id} game={game}/>)
    }else{
        displayGames = null
    }

    return(
        <div className='game-search'>
            <h1>The {collectionName} collection:</h1>
            <div className="game-container">
                {displayGames}
            </div>
        </div>
    )
}

export default Collection