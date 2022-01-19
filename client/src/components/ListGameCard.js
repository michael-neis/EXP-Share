import { useNavigate } from 'react-router-dom';


function ListGameCard({ game, listDesc, handleRemoveFromList, itemId }){

    let history = useNavigate()
    
    let gameButton

    if(listDesc === 'reviews'){
        gameButton = <button>review</button>
    }else if(listDesc === 'wishlist'){
        gameButton = <button>wishlist</button>
    }else if(listDesc === 'list'){
        gameButton = <button onClick={() => handleRemoveFromList(itemId)}>Remove from list</button>
    }

    const handleTitleClick = () =>{
        localStorage.setItem('gameId', game.api_id)
        history('/game')
    }

    return(
        <div>
            <h1 style={{cursor: 'pointer'}} onClick={handleTitleClick}>{game.title}</h1>
            {gameButton}
        </div>
    )
}

export default ListGameCard