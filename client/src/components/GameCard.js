import { useNavigate } from 'react-router-dom';

function GameCard({ game }){
    let history = useNavigate()

    const handleClick = () => {
        localStorage.setItem('gameId', game.id)
        history('/game')
    }

    return(
        <div className="game-card" onClick={handleClick}>
            <img alt={game.name} src={game.cover && game.cover.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png'}/>
            <p>{game.name}</p>
        </div>
    )
}

export default GameCard