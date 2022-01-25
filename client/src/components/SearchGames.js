import { useState } from 'react';
import GameCard from './GameCard';



function SearchGames(){

    const [searchTitle, setSearchTitle] = useState('')
    const [results, setResults] = useState(null)

    const handleChange = (e) => {
        setSearchTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(searchTitle)
        }

        fetch('/api/search_games', configObj).then((res) =>{ 
            if (res.ok) {
                res.json().then((data) => {
                    setResults(data)
                    setSearchTitle('')
                })
            } else {
                res.json().then((errors) => {
                    alert(errors.errors);
                })
            }
        })
    }

    let displayGames

    if(!results){
        displayGames = null
    }else if(results.length === 0){
        displayGames = <h1>No Games Found</h1>
    }else{
        displayGames = results.map((result) => <GameCard key={result.id} game={result}/>)
    }

    return(
        <div className='game-search'>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <h2>Search by Title:</h2>
                <label>
                    <input className='nes-input is-dark' type="text" name="name" value={searchTitle} onChange={handleChange} />
                </label>
                <button className="nes-btn is-success" type='submit' style={{fontSize: '14px'}}>Search</button>
            </form>
            {results ? 
            <div className="game-container">
                {displayGames}
            </div>
            :
            null}
        </div>
    )
}

export default SearchGames