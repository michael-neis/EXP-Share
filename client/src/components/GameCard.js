import { useNavigate } from 'react-router-dom';

function GameCard({ game }){
    let history = useNavigate()

    const handleClick = () => {
        localStorage.setItem('gameId', game.id)
        history('/game')
    }

    return(
        <>
            <h1 onClick={handleClick}>{game.name}</h1>
            <img alt={game.name} src={game.cover && game.cover.image_id ? `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg` : 'https://www.nicepng.com/png/detail/246-2469081_jake-adventure-time-and-jake-the-dog-image.png'}/>
        </>
    )
}

export default GameCard