import { useState } from 'react'
import GameCard from './GameCard'
import { useNavigate } from 'react-router-dom';

function DiscoverGames(){

    const [showBool, setShowBool] = useState(false)
    const [games, setGames] = useState([])
    const [loading, setLoading] = useState(false)

    let history = useNavigate()

    const handleClick = () => {

        if(games === 'no reviews'){
            history('/search')
        }else{

        setLoading(true)

        fetch('api/discover').then(res => {
            if(res.ok){
                res.json()
                .then(data => {
                    setGames(data)
                    setLoading(false)
                })
            }else{
                res.json()
                .then(errors => {
                    setGames(errors.message)
                    setLoading(false)
                })
            }
        })
        setShowBool(true)
    }
}

    let displayGames

    if(games === 'no reviews'){
        displayGames = <h3>Looks like you haven't reviewed any games yet</h3>
    }else{
        displayGames = games.map((game) => <GameCard key={game.id} game={game}/>)
    }

    if(!showBool){
    return(
        <div className='discover-landing'>
            <h2>We find you suggestions based on your highest reviewed games!</h2>
            <button className='nes-btn is-success' onClick={handleClick}>Show me!</button>
        </div>
    )
    }

    return(
        <div className='game-search'>
            <h1 style={{marginBottom: 20}}>Discover</h1>
            <button className='nes-btn is-success' onClick={handleClick} style={{marginBottom: 20}}>Find more!</button>
            <h3 style={{marginBottom: 20}}>Results:</h3>
            <div className="game-container">
                {loading ?
                <div style={{margin: 'auto'}}>
                <p>Loading...</p>
                <div className="field">
                    <div className="net"></div>
                    <div className="ping"></div>
                    <div className="pong"></div>
                    <div className="ball"></div>
                </div>
                </div>
                : displayGames}
            </div>
        </div>
    )
}

export default DiscoverGames