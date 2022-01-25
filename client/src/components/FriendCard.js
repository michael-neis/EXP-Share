import { Modal } from 'react-bootstrap'
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

    const handleMessageClick = () => {
        localStorage.setItem('userId', friend.id)
        localStorage.setItem('userUsername', friend.username)
        history('/messages')
    }

    return(
        <div className="friend-card">
            <img alt='friend profile' src={friend.profile_pic ? friend.profile_pic : 'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
            <h1 onClick={handleFriendClick}>{friend.username}</h1>
            <button className="nes-btn is-error" onClick={handleRemoveModal}>Remove Friend</button>
            <button className="nes-btn is-primary" onClick={handleMessageClick}>Message</button>
            <Modal show={showRemove} onHide={handleRemoveClose}>
                <Modal.Header >
                <Modal.Title>Are you sure you wish to remove {friend.username} as a friend?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <button className='nes-btn' onClick={handleRemoveClose}>
                    Cancel
                </button>
                <button className='nes-btn is-error' onClick={handleRemoveClick} style={{float: 'right'}}>
                    Remove
                </button>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default FriendCard