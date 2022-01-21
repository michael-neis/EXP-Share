import { useNavigate } from 'react-router-dom';


function ListGameCard({ game, listDesc, handleRemoveFromList, itemId }){

    let history = useNavigate()
    
    let gameButton
    let reviewRating
    let reviewComment

    if(listDesc === 'reviews'){
        reviewRating = <h3>{game.rating}/10</h3>
        reviewComment = <h4>{game.comment}</h4>
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
            {reviewRating}
            {reviewComment}
            {gameButton}
        </div>
    )
}

export default ListGameCard