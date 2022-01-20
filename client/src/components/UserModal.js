import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
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
        <Modal.Header closeButton>
            <Modal.Title>{currentUser.username}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
            <Button onClick={handleEditProfile}>
                My Profile
            </Button>
            <Button variant="warning" onClick={handleLogout}>
                Logout
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default UserModal