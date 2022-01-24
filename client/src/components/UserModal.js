import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function UserModal({showUserModal, handleClose, currentUser, setCurrentUser}){

    let history = useNavigate();

    const handleLogout = () => {
        handleClose();
        setCurrentUser(null)
        fetch('/api/logout', { method: 'DELETE' })
        history('/')
    }

    const handleEditProfile = () => {
        handleClose();
        history('/my_profile')
    }


    return(
    <>
    <Modal show={showUserModal} onHide={handleClose}>
        <Modal.Header >
            <Modal.Title>{currentUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <button className='nes-btn is-primary' style={{fontSize: 10, marginRight: 10}} onClick={handleEditProfile}>
                My Profile
            </button>
            <button className='nes-btn is-warning' style={{fontSize: 10}} variant="warning" onClick={handleLogout}>
                Logout
            </button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default UserModal