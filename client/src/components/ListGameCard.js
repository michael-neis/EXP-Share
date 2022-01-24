import { useNavigate } from 'react-router-dom';


function ListGameCard({ game, listDesc, handleRemoveFromList, itemId }){

    let history = useNavigate()
    
    let gameButton
    let reviewRating
    let reviewComment

    if(listDesc === 'reviews'){
        reviewRating = <p>{game.rating}/10</p>
        game.comment ? reviewComment = <p>"{game.comment}"</p> : reviewComment = null
    }else if(listDesc === 'list'){
        gameButton = <button onClick={() => handleRemoveFromList(itemId)}>Remove from list</button>
    }

    const handleTitleClick = () =>{
        localStorage.setItem('gameId', game.api_id)
        history('/game')
    }

    return(
        <div className="game-card">
            <img alt={game.title} src={game.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png'}  onClick={handleTitleClick}/>
            <p  onClick={handleTitleClick}>{game.title}</p>
            {reviewRating}
            {reviewComment}
            {gameButton}
        </div>
    )
}

export default ListGameCard