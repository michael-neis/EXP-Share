import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import { useState } from 'react'


function ListGameCard({ game, listDesc, handleRemoveFromList, itemId }){

    const [showDelete, setShowDelete] = useState(false)

    let history = useNavigate()

    const handleDeleteModal = () => {
        setShowDelete(true)
    }

    const handleDeleteClose = () => {
        setShowDelete(false)
    }
    
    let gameButton
    let reviewRating
    let reviewComment
    

    if(listDesc === 'reviews'){
        reviewRating = <p style={{color: 'gold'}}>{game.rating}/10</p>
        game.comment ? reviewComment = <p>"{game.comment}"</p> : reviewComment = null
    }else if(listDesc === 'list'){
        gameButton = <button className='nes-btn is-error' onClick={handleDeleteModal}>Remove from list</button>
    }

    const handleTitleClick = () =>{
        localStorage.setItem('gameId', game.api_id)
        history('/game')
    }


    return(
        <div className="game-card" onClick={handleTitleClick}>
            <img alt={game.title} src={game.image_id ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.image_id}.jpg` : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/832px-No-Image-Placeholder.svg.png'}  />
            <p  >{game.title}</p>
            {reviewRating}
            {reviewComment}
            <div onClick={(e) => e.stopPropagation()}>
            {gameButton}
            <Modal show={showDelete} onHide={handleDeleteClose}>
                <Modal.Header >
                <Modal.Title>Are you sure you wish to remove {game.title} from this list?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <button className='nes-btn' onClick={handleDeleteClose}>
                    Cancel
                </button>
                <button className='nes-btn is-error' onClick={() => handleRemoveFromList(itemId)} style={{float: 'right'}}>
                    Remove
                </button>
                </Modal.Body>
            </Modal>
            </div>
        </div>
    )
}

export default ListGameCard