import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function UserDataModal({showUserModal, handleUserClose, setUserFormData, userFormData, handleUserSubmit}){

    const handleChange = (e) => {
        setUserFormData({
            ...userFormData,
            [e.target.id]: e.target.value
        })
    }

    return(
    <>
    <Modal show={showUserModal} onHide={handleUserClose}>
        <Modal.Header closeButton>
            <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleUserSubmit(e)}>
            <Form.Group style={{padding: 10}} onChange={handleChange}>
                    <Form.Label htmlFor="username" style={{marginTop: 5, marginLeft: 10}}>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        id="username"
                        aria-describedby="usernameBlock"
                        value={userFormData.username}
                        onChange={handleChange}
                    />
                    <Form.Label htmlFor="bio" style={{marginTop: 5, marginLeft: 10}}>Bio:</Form.Label>
                    <Form.Control
                        type="text"
                        id="bio"
                        aria-describedby="bioBlock"
                        value={userFormData.bio}
                        onChange={handleChange}
                    />
            </Form.Group>   
        <Modal.Footer>
            <Button onClick={handleUserClose}>
                Cancel
            </Button>
            <Button variant="success" type='submit'>
                Save
            </Button>
        </Modal.Footer>
        </Form>
    </Modal>
    </>
    )
}

export default UserDataModal