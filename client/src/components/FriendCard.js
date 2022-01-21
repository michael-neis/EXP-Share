import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FriendCard({friend, handleRemoveFriend}){

    let history = useNavigate()

    const [showRemove, setShowRemove] = useState(false)

    const handleFriendClick = () => {
        localStorage.setItem('userId', friend.id)
        history('/user')
    }

    const handleRemoveModal = () => {
        setShowRemove(true)
    }

    const handleRemoveClose = () => {
        setShowRemove(false)
    }

    const handleRemoveClick = () => {
        handleRemoveFriend(friend)
        setShowRemove(false)
    }

    return(
        <div>
            <h1 onClick={handleFriendClick}>{friend.username}</h1>
            <button onClick={handleRemoveModal}>Remove Friend</button>
            <Modal show={showRemove} onHide={handleRemoveClose}>
                <Modal.Header closeButton>
                <Modal.Title>Are you sure you wish to remove {friend.username} as a friend?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Button variant="secondary" onClick={handleRemoveClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleRemoveClick} style={{float: 'right'}}>
                    Remove
                </Button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default FriendCard